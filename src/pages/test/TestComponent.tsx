import { Typography } from '@mui/material';
import { memo, useDeferredValue, useState } from 'react';

type ChildProps = {
  deferredValue: string;
};

const Child = ({ deferredValue }: ChildProps) => {
  return <Typography>{deferredValue}</Typography>;
};

const MemoizedChild = memo(Child);

export const TestComponent = () => {
  const [value, setValue] = useState('');
  // const [isPending, startTransition] = useTransition();

  const deferredValue = useDeferredValue(value, '');

  const onChange = (e: any) => {
    setValue(e.target.value);
    // startTransition(() => {
    //   setValue(e.target.value);
    // });
  };

  return (
    <div>
      <Typography variant="h4">Test Component</Typography>
      <input className="mt-4!" value={value} onChange={onChange} />
      {/* <Typography>{deferredValue}</Typography> */}
      <MemoizedChild deferredValue={deferredValue} />
    </div>
  );
};
