import { Button, Typography } from '@mui/material';
import { useState } from 'react';

const microtaskPromise = (callBack: any) =>
  Promise.resolve().then(() => {
    callBack();
  });

export const TestComponent = () => {
  const [count, setCount] = useState(0);
  const [bool, setBool] = useState(false);
  console.log('count: ' + count + ', ' + bool);

  const handleClick = async () => {
    setCount((prev) => prev + 1);
    microtaskPromise(() => setBool(true));
  };

  return (
    <div>
      <Typography variant="h4">Test Component</Typography>
      <Button variant="text" onClick={handleClick}>
        Click
      </Button>
      <Button variant="text" onClick={async () => {}}>
        Heavy
      </Button>
      <Typography>{String(count)}</Typography>
    </div>
  );
};
