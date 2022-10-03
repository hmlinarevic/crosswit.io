import GameEndCompleted from './game-end-completed'
import GameEndFailed from './game-end-failed'

export default function GameEnd({
  scores,
  level,
  result,
  timeLeft,
  wordsFoundNum,
  onNextClick,
}) {
  return (
    <div className="relative grid h-screen place-content-center justify-items-center font-ubuntuMono">
      {result === 'completed' && (
        <GameEndCompleted
          scores={scores}
          level={level}
          result={result}
          timeLeft={timeLeft}
          wordsFoundNum={wordsFoundNum}
          onNextClick={onNextClick}
        />
      )}

      {result === 'failed' && <GameEndFailed level={level} result={result} />}
    </div>
  )
}
