import { useState } from 'react';
import {
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  InputProps as ChakraInputProps,
  forwardRef,
} from '@chakra-ui/react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export const InputPassword = forwardRef<ChakraInputProps, 'input'>(
  ({ ...props }, ref) => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    return (
      <InputGroup size='md'>
        <Input
          type={show ? 'text' : 'password'}
          placeholder=' password'
          ref={ref}
          {...props}
        />
        <InputRightElement>
          <IconButton
            display={'flex'}
            aria-label={'change display password'}
            variant={'unstyled'}
            onClick={handleClick}
            icon={show ? <FiEyeOff /> : <FiEye />}
          />
        </InputRightElement>
      </InputGroup>
    );
  }
);
