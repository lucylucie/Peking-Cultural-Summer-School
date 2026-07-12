import { useNavigate } from 'react-router-dom'
import { CURRENT_VILLAGE_AUTHOR_ID } from '../../lib/currentUser'
import ContentStudio from '../../components/shared/ContentStudio'

export default function VoiceContribution() {
  const navigate = useNavigate()

  return (
    <ContentStudio
      createNew
      primaryAuthorId={CURRENT_VILLAGE_AUTHOR_ID}
      onComplete={({ entryId }) => navigate(`/village/draft/${entryId}`)}
    />
  )
}
