import React from 'react';
import { useTheme } from '@ui-kitten/components';
import { RefreshControl } from 'react-native-web-refresh-control';

export interface MyRefreshControlProps {
  refreshing?: boolean;
  onRefresh?(): void;
}

export default React.forwardRef(({ refreshing, onRefresh }: MyRefreshControlProps, ref) => {
  const theme = useTheme();

  return (
    <RefreshControl
      tintColor={theme['background-basic-color-9']}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
});
