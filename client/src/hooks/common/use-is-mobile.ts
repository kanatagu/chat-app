import { useBreakpointValue } from '@chakra-ui/react';

type BreakPointType = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const useIsMobile = (breakpoint: BreakPointType = 'md') => {
  return useBreakpointValue({ base: true, [breakpoint]: false });
};
