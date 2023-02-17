import React from 'react';
import { FlatList } from 'react-native';
import { AnimatedAppearance, Container, NavigationAction } from 'components';
import { TopNavigation } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { useLayout } from 'hooks';

import TermItem from './components/TermItem';

import keyExtractor from 'utils/keyExtractor';
import { Animation_Types_Enum, TermSpec } from 'constants/types';

const TermOfUseScreen = React.memo(() => {
  const { bottom } = useLayout();
  const { t } = useTranslation(['common', 'term_of_use']);

  const data: TermSpec[] = [
    {
      title: t('term_of_use:about_you'),
      description: t('term_of_use:term_description'),
    },
    {
      title: t('term_of_use:placing_an_order'),
      description: t('term_of_use:term_description'),
    },
    {
      title: t('term_of_use:prices_and_products'),
      description: t('term_of_use:term_description'),
    },
    {
      title: t('term_of_use:delivery'),
      description: t('term_of_use:term_description'),
    },
    {
      title: t('term_of_use:promo_codes'),
      description: t('term_of_use:term_description'),
    },
    {
      title: t('term_of_use:returns_and_refunds'),
      description: t('term_of_use:term_description'),
    },
    {
      title: t('term_of_use:help_with_us'),
      description: t('term_of_use:term_description'),
    },
  ];

  const renderListCategory = React.useCallback(
    ({ item, index }: { item: TermSpec; index: number }) => {
      return (
        <AnimatedAppearance type={Animation_Types_Enum.SlideBottom} index={index}>
          <TermItem item={item} />
        </AnimatedAppearance>
      );
    },
    []
  );

  return (
    <Container>
      <TopNavigation
        accessoryLeft={() => <NavigationAction />}
        title={t('term_of_use:term_of_use')}
      />
      <FlatList
        data={data || []}
        renderItem={renderListCategory}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottom + 16 }}
      />
    </Container>
  );
});

export default TermOfUseScreen;
