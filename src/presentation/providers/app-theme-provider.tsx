import { ThemeProvider } from '@mui/material';
import { selectColorMode } from 'presentation/stores/color-mode-slice';
import appTheme from 'presentation/theme/theme';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

type Props = { children: React.ReactNode };

const AppThemeProvider: React.FC<Props> = ({ children }: Props) => {
  const { colorMode } = useSelector(selectColorMode);
  const theme = useMemo(() => appTheme(colorMode), [colorMode]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
