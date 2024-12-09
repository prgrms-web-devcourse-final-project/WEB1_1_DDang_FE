export function appendParticle(word: string) {
  const lastChar = word.charAt(word.length - 1)
  const unicodeValue = lastChar.charCodeAt(0)

  // 한글 유니코드 범위 체크
  if (unicodeValue < 0xac00 || unicodeValue > 0xd7a3) {
    return word + '랑'
  }

  // 종성 확인
  const hasConsonantJongseong = (unicodeValue - 0xac00) % 28 > 0

  return word + (hasConsonantJongseong ? '이랑' : '랑')
}
