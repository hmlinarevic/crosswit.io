import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons'

export default function GameEndFailed({ level, result }) {
  return (
    <>
      <FontAwesomeIcon icon={faXmarkCircle} className="text-3xl text-red-500" />
      <h2>
        level {level} {result}
      </h2>

      <button>retry</button>
      <button>quit</button>
    </>
  )
}
