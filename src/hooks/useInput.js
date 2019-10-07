import { useState, useCallback } from 'react';

const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback(event => setValue(event.target.value), []);

  return [value, handleChange];
};

export { useInput };
