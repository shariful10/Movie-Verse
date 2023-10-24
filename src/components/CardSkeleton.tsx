import { CiImageOff } from "react-icons/ci"

const CardSkeleton = ({error}: {error?: boolean}) => {
  return (
    <div className={`h-[450px] md:h-[335px] w-full grid gap-4 place-items-center bg-primary ${!error && "card__skeletion"}`}>
      {error && <CiImageOff size={56} />}
    </div>
  )
}

export default CardSkeleton