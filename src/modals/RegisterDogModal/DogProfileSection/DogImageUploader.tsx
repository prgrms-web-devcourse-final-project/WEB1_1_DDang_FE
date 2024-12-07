import { AddDogPictureBtnWrapper, AddDogPictureBtn, HiddenFileInput, DogImage } from './styles'
import AddDogPicture from '~assets/add-dog-picture.svg'
import { useRef } from 'react'

interface DogImageUploaderProps {
  image: string | undefined
  setImage: (update: { profileImg: string; profileImgFile: File }) => void
}

export default function DogImageUploader({ image, setImage }: DogImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage({
          profileImg: reader.result as string,
          profileImgFile: file,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <AddDogPictureBtnWrapper>
      <AddDogPictureBtn onClick={() => fileInputRef.current?.click()}>
        <img src={AddDogPicture} alt='반려견 사진 추가' />
        <div>반려견 사진 추가</div>
        <HiddenFileInput type='file' ref={fileInputRef} onChange={handleImageChange} />
        {image && <DogImage src={image} alt='반려견 사진' $hasImage />}
      </AddDogPictureBtn>
    </AddDogPictureBtnWrapper>
  )
}
