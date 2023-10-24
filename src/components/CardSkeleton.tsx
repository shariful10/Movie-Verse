import { CiImageOff } from "react-icons/ci"

const CardSkeleton = ({error}: {error?: boolean}) => {
  return (
    <div className={`h-[450px] md:h-[335px] w-full grid place-items-center bg-primary ${!error && "cardSkeletion"}`}>
      {error && <CiImageOff size={56} />}
    </div>
  )
}

export default CardSkeleton