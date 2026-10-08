import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

/**
 * BottomNavBar — barra de navegación inferior de Stuhbit.
 *
 * Uso:
 * <BottomNavBar
 *   activeRoute="inicio"
 *   onNavigate={(routeKey) => navigation.navigate(routeKey)}
 * />
 *
 * Para añadir/quitar pestañas, edita el arreglo TABS.
 */
const TABS = [
  { key: 'inicio', label: 'Inicio', icon: 'home-outline', iconActive: 'home' },
  { key: 'cronograma', label: 'Horario', icon: 'calendar-outline', iconActive: 'calendar' },
  { key: 'enfoque', label: 'Enfoque', icon: 'timer-outline', iconActive: 'timer' },
  { key: 'archivos', label: 'Archivos', icon: 'document-text-outline', iconActive: 'document-text' },
  { key: 'perfil', label: 'Perfil', icon: 'person-outline', iconActive: 'person' },
];

export default function BottomNavBar({ activeRoute, onNavigate, tabs = TABS }) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={styles.contenedor}>
        {tabs.map((tab) => {
          const activo = tab.key === activeRoute;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tab}
              activeOpacity={0.7}
              onPress={() => onNavigate && onNavigate(tab.key)}
            >
              <Ionicons
                name={activo ? tab.iconActive : tab.icon}
                size={24}
                color={activo ? colors.primary : colors.textSecondary}
              />
              <Text
                style={[
                  styles.label,
                  { color: activo ? colors.primary : colors.textSecondary },
                ]}
                numberOfLines={1}
              >
                {tab.label}
              </Text>
              {activo && <View style={styles.indicador} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  contenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 6,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...typography.micro,
    marginTop: 4,
  },
  indicador: {
    position: 'absolute',
    top: -10,
    width: 28,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
});