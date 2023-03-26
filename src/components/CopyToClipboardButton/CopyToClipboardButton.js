import React, { useState } from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import createSvgIcon from "@material-ui/icons/utils/createSvgIcon";

const ContentCopyFilledIcon = createSvgIcon(
  <path d="M9 18q-.825 0-1.413-.588T7 16V4q0-.825.588-1.413T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.588 1.413T18 18H9Zm-4 4q-.825 0-1.413-.588T3 20V7q0-.425.288-.713T4 6q.425 0 .713.288T5 7v13h10q.425 0 .713.288T16 21q0 .425-.288.713T15 22H5Z" />,
  "ContentCopy"
);

const CopyToClipboardButton = (props) => {

  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(true)
    navigator.clipboard.writeText(props.content)
  }

  return (
    <>
      <Tooltip
        open={open}
        title={"Copied to clipboard"}
        leaveDelay={800}
        onClose={() => setOpen(false)}>
        <IconButton
          color="primary"
          onClick={() => handleClick()}>
          <ContentCopyFilledIcon fontSize='small'/>
        </IconButton>
      </Tooltip>
    </>
  )
}

export default CopyToClipboardButton