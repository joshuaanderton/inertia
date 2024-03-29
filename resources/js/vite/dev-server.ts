import { resolve } from 'path'
import { UserConfig } from 'vite'
import fs from 'fs'
import { homedir } from 'os'
import { _env, _set, _merge, _has, _cascade, _log } from './utils'

export default (config: UserConfig, mode: string) => {

	const hmrHost = String(_env('APP_URL', '', mode)).split('//').reverse()[0] || 'localhost',
				host = _cascade(config, hmrHost, 'server.hmr.host', 'server.host', 'host'),
				port = config.server?.port || 3000

	// Set HMR host
	_set(config, 'server.hmr.host', hmrHost)


	// Set dev server port & host
	_set(config, 'server.port', port)
  _set(config, 'server.host', host)

	// Configure certs
	config = httpsConfig(config)

	return config
}

const httpsConfig = (config: UserConfig) => {

	// If key and cert are set at this point
	// then it was by the dev (always trust the dev)
	if (_has(config, 'server.https.key', 'server.https.cert')) {
		return config
	}

	const valetDefaultCredsPath = `.config/valet/Certificates/${config.server?.host}`,
				key = resolve(homedir(), `${valetDefaultCredsPath}.key`),
				cert = resolve(homedir(), `${valetDefaultCredsPath}.crt`)

	try {

		config = _merge(config, 'server.https', {
			key: fs.readFileSync(key),
			cert: fs.readFileSync(cert),
		})

	} catch {
		// If the dev was hoping for https, then tell them what happened
		// config.server.host was set in last step
		if (config.server?.https === true) {
			_log(
				'{theme}[joshuaanderton/inertia]',
				`No key/cert at {green}${valetDefaultCredsPath}`,
				`Have you run {blue}{underline}'valet secure'{theme} yet? 🤔`
			)
		}
	}

	return config
}