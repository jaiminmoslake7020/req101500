import React, {useCallback, useEffect, useState} from 'react';
import { getCanvas, getObjectById } from '../utils/canvas';
import { wrapText } from '../utils/wrapText';
import {TextField} from '@mui/material';

function CanvasHeading() {
  const [title, setTitle] = useState<string>('Heading');
  const [titleError, setTitleError] = useState<string | undefined>(undefined);
  const [titleCurrent, setTitleCurrent] = useState<string>('Heading');

  const changeTitle = useCallback((p:string) => {
    const obj = getObjectById('title-text');
    if (obj) {
      // console.log('title', p);
      if (p !== "") {
        const returnValue = wrapText(obj, (p || "").trim());
        console.log('returnValue', returnValue);
        if (!returnValue) {
          setTitleError('Title has very long words. Please rephrase the title in order to have good looking classified.');
        } else {
          setTitleError(undefined);
        }
        getCanvas().requestRenderAll();
        setTitleCurrent(p);
      }
    }
  }, []);

  let allow = true;
  useEffect(() => {
    const mount = () => {
      const newTitle = `${title}`;
      if (allow && titleCurrent !== newTitle) {
        allow = false;
        changeTitle(newTitle);
      }
    }
    return mount();
  }, [title]);

  return (
      <>
        <div className={"flex justify-center"}>
          <TextField
              className={"mb-4 w-[400px]"}
              error={typeof titleError === "string"}
              helperText={titleError}
              id="heading"
              label="Heading"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
          />
        </div>
        <div id="canvas-title" data-title={title} />
      </>
  );
}

CanvasHeading.defaultProps = {

};

export default CanvasHeading;
