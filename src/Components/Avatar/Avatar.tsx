import React, { useState } from 'react';

const Avatar = () => {
  const [file, setFile] = useState<any>(null);

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };
  return <input type={'file'} onChange={onChangeFile} />;
};
export default Avatar;
