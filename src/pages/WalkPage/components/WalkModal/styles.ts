import styled, { css } from 'styled-components'
import { Box } from '~components/Box'
import { ActionButton } from '~components/Button/ActionButton'
import Report from '~assets/report.svg?react'
import { Separator } from '~components/Separator'

interface StyleProps {
  type: 'request' | 'accept' | 'complete' | 'progress' | 'friend' | 'report' | 'reportComplete' | 'walkRequest'
}

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
  touch-action: none;
`

export const ModalContent = styled(Box)<StyleProps>`
  background: white;
  border-radius: 20px;
  width: 85%;
  min-width: 280px;
  max-width: 320px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;

  h1 {
    font-size: 14px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.brand.darken};
    margin-bottom: 16px;
  }

  ${({ type }) => {
    switch (type) {
      case 'request':
        return css`
          padding: 24px 20px;
          text-align: center;
        `
      case 'accept':
      case 'walkRequest':
        return css`
          padding: 24px 20px;
          text-align: center;
        `
      case 'complete':
        return css`
          padding: 24px 20px;
          text-align: center;
          .message {
            margin-top: 16px;
            font-weight: 500;
            color: #000;
          }
        `
      case 'progress':
        return css`
          padding: 24px 20px;
          text-align: center;
        `
      case 'friend':
        return css`
          background: #f5f5f5;
          padding: 16px;
          .date {
            font-size: 14px;
            color: #666;
            margin-bottom: 12px;
          }
        `
      case 'report':
        return css`
          padding: 24px 20px;
          text-align: center;
        `
      case 'reportComplete':
        return css`
          padding: 24px 20px;
          text-align: center;

          h1 {
            font-size: 14px;
            font-weight: 700;
            color: ${({ theme }) => theme.colors.brand.darken};
            margin-bottom: 24px;
          }
        `
    }
  }}
`

export const ReportIcon = styled(Report)`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 24px;
  right: 24px;
`

export const UserInfo = styled.div<StyleProps>`
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  ${({ type }) => {
    switch (type) {
      case 'friend':
        return css`
          background: white;
          padding: 16px;
          border-radius: 12px;
        `
      case 'accept':
      case 'walkRequest':
        return css`
          justify-content: start;
          gap: 12px;
          margin-bottom: 32px;
        `
      case 'complete':
      case 'progress':
        return css`
          justify-content: center;
          padding: 0;
        `
      case 'request':
        return css`
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 0;
          gap: 12px;
        `
    }
  }}
`

export const Avatar = styled.img<StyleProps>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.brand.lighten_1};

  ${({ type }) => {
    switch (type) {
      case 'complete':
      case 'progress':
        return css`
          margin-right: 0;
          margin-bottom: 12px;
        `
      default:
        return css`
          margin-right: 12px;
        `
    }
  }}
`

export const Info = styled.div<StyleProps>`
  h3 {
    font-size: 17px;
    font-style: bold;
    font-weight: 700;
    margin: 0;
    margin-bottom: 4px;
  }

  p {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.grayscale.font_2};
    font-weight: 500;
    margin: 0;
    display: flex;
    align-items: center;
  }

  ${({ type }) => {
    switch (type) {
      case 'friend':
        return css`
          h3 {
            font-size: 15px;
          }
        `
      case 'accept':
      case 'walkRequest':
        return css`
          text-align: start;
        `
      case 'complete':
      case 'progress':
        return css`
          text-align: center;
          h3 {
            font-size: 18px;
            margin-bottom: 8px;
          }
          p {
            font-size: 13px;
          }
        `
      case 'request':
        return css`
          text-align: start;
          h3 {
            font-weight: 600;
            margin-bottom: 8px;
          }
          p {
            color: #666;
            margin: 0;
          }
        `
    }
  }}
`

export const ProposalMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.grayscale.gc_3};
  border-radius: 16px;
  padding: 20px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.grayscale.font_3};
  width: 100%;
  text-align: left;
  line-height: 1.5;
`

export const Message = styled.p<StyleProps>`
  margin: 0;
  ${({ type }) => {
    switch (type) {
      case 'request':
        return css`
          padding: 20px;
          height: 124px;
          background-color: ${({ theme }) => theme.colors.grayscale.gc_3};
          border-radius: 12px;
          border: none;
          font-size: 15px;
          color: ${({ theme }) => theme.colors.grayscale.font_3};
          text-align: center;
          max-width: 280px;
          width: 100%;
        `
      case 'progress':
        return css`
          font-size: 17px;
          font-style: bold;
          font-weight: 700;
          color: ${({ theme }) => theme.colors.grayscale.font_1};
          padding-top: 24px;
          margin-bottom: 40px;
          text-align: center;
        `
      case 'accept':
        return css`
          color: #000;
          font-weight: 600;
        `
      case 'complete':
        return css`
          color: #666;
          font-weight: 500;
        `
      case 'reportComplete':
        return css`
          font-size: 17px;
          font-weight: 700;
          color: ${({ theme }) => theme.colors.grayscale.font_1};
          margin-bottom: 24px;
        `
      default:
        return css`
          color: #333;
        `
    }
  }};
`

export const ButtonGroup = styled.div<StyleProps>`
  display: flex;
  gap: 8px;
  justify-content: center;

  ${({ type }) => {
    switch (type) {
      case 'accept':
        return css`
          display: flex;
          gap: 8px;
          margin-top: 32px;
        `
      case 'complete':
      case 'progress':
        return css`
          margin-top: 20px;
        `
      case 'friend':
        return css`
          margin-top: 12px;
        `
    }
  }}
`

export const Button = styled(ActionButton).attrs({
  $type: 'roundedRect',
})<StyleProps & { variant?: 'confirm' | 'cancel' }>`
  flex: 1;

  ${({ type, variant }) => {
    if (type === 'accept' || type === 'walkRequest' || type === 'progress' || type === 'report') {
      return css`
        background-color: ${variant === 'cancel'
          ? ({ theme }) => theme.colors.brand.lighten_3
          : ({ theme }) => theme.colors.brand.default};
        color: ${variant === 'cancel' ? ({ theme }) => theme.colors.grayscale.font_1 : 'white'};
      `
    }
    switch (type) {
      case 'request':
        return css`
          width: 100%;
          max-width: 280px;
          background-color: ${({ theme }) => theme.colors.brand.lighten_3};
          color: ${({ theme }) => theme.colors.grayscale.font_1};
          font-size: 14px;
          font-style: bold;
          padding: 14px 0;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
        `
      case 'complete':
        return css`
          background-color: ${({ theme }) => theme.colors.brand.default};
          color: white;
          font-size: 15px;
          padding: 12px 0;
        `
      case 'friend':
        return css`
          background-color: #6b4b35;
          color: white;
          font-size: 14px;
          padding: 10px 0;
        `
    }
  }}
`

export const SelectWrapper = styled.div`
  margin: 20px 0;
  width: 100%;
`

export const InfoSeparator = styled(Separator)`
  margin: 0 4px;
`
