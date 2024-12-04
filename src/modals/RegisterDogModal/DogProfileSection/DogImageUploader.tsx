import { AddDogPictureBtnWrapper, AddDogPictureBtn, HiddenFileInput, DogImage } from './styles'
import AddDogPicture from '~assets/add-dog-picture.svg'
import { useRef } from 'react'
interface DogImageUploaderProps {
  image: File | undefined
  setImage: (image: File) => void
}

export default function DogImageUploader({ image, setImage }: DogImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
    }
  }

  return (
    <AddDogPictureBtnWrapper>
      <AddDogPictureBtn onClick={() => fileInputRef.current?.click()}>
        <img src={AddDogPicture} alt='반려견 사진 추가' />
        <div>반려견 사진 추가</div>
        <HiddenFileInput type='file' ref={fileInputRef} onChange={handleImageChange} accept='image/*' />
        {image && <DogImage src={URL.createObjectURL(image)} alt='반려견 사진' $hasImage />}
      </AddDogPictureBtn>
    </AddDogPictureBtnWrapper>
  )
}
