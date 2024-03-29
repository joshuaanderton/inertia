import DeleteTeamForm from '@ja-inertia/vendor/jetstream/Pages/Teams/Partials/DeleteTeamForm'
import TeamMemberManager from '@ja-inertia/vendor/jetstream/Pages/Teams/Partials/TeamMemberManager'
import UpdateTeamNameForm from '@ja-inertia/vendor/jetstream/Pages/Teams/Partials/UpdateTeamNameForm'
import SectionBorder from '@ja-inertia/vendor/jetstream/components/SectionBorder'
import { AppLayout } from '@ja-inertia/components'
import {
  JetstreamTeamPermissions,
  Role,
  Team,
  TeamInvitation,
  User,
  NavItem
} from '@ja-inertia/types'
import React from 'react'

interface UserMembership extends User {
  membership: {
    role: string
  }
}

interface Props {
  team: Team & {
    owner: User
    team_invitations: TeamInvitation[]
    users: UserMembership[]
  }
  teams: Array<Team>
  navigation: Array<NavItem>
  availableRoles: Role[]
  permissions: JetstreamTeamPermissions
  alerts: Array<object>
}

export default ({ team, teams, navigation, alerts, permissions, availableRoles }: Props) => {

  return (
    <AppLayout
      navigation={navigation}
      alerts={alerts}
      team={team}
      teams={teams}
    >
      <UpdateTeamNameForm team={team} permissions={permissions} />

      <div className="mt-10 sm:mt-0">
        <TeamMemberManager
          team={team}
          availableRoles={availableRoles}
          permissions={permissions}
        />
      </div>

      {permissions.canDeleteTeam && !team.personal_team ? (
        <>
          <SectionBorder />

          <div className="mt-10 sm:mt-0">
            <DeleteTeamForm team={team} />
          </div>
        </>
      ) : null}
    </AppLayout>
  )
}
