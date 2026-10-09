import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

/**
 * AppHeader — encabezado reutilizable de Stuhbit.
 *
 * Dos modos de uso:
 *
 * 1) Saludo (pantalla de inicio):
 *    <AppHeader
 *      greeting="¡Hola, Sofía!"
 *      subtitle="Octubre 2025"
 *      avatarUri="https://..."
 *      onAvatarPress={() => {}}
 *      onNotificationPress={() => {}}
 *      hasNotification
 *    />
 *
 * 2) Título de sección con botón de volver (pantallas internas):
 *    <AppHeader
 *      title="Sprint de Estudio"
 *      showBack
 *      onBackPress={() => navigation.goBack()}
 *      rightIcon="ellipsis-horizontal"
 *      onRightPress={() => {}}
 *    />
 */
export default function AppHeader({
  // Modo saludo
  greeting,
  subtitle,
  avatarUri,
  onAvatarPress,
  hasNotification = false,
  onNotificationPress,

  // Modo título / navegación
  title,
  showBack = false,
  onBackPress,
  rightIcon,
  onRightPress,
}) {
  const esModoSaludo = !!greeting;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.contenedor}>
        {esModoSaludo ? (
          <>
            <TouchableOpacity
              onPress={onAvatarPress}
              activeOpacity={0.8}
              disabled={!onAvatarPress}
            >
              {avatarUri ? (
                <Image source={{ uri: avatarUri }} style={styles.avatar} />
              ) : (
                <View style={[styles.avatar, styles.avatarPlaceholder]}>
                  <Ionicons name="person" size={20} color={colors.textInverted} />
                </View>
              )}
            </TouchableOpacity>

            <View style={styles.textoGrupo}>
              <Text style={styles.greeting} numberOfLines={1}>
                {greeting}
              </Text>
              {subtitle ? (
                <Text style={styles.subtitle} numberOfLines={1}>
                  {subtitle}
                </Text>
              ) : null}
            </View>

            <TouchableOpacity
              style={styles.iconoBoton}
              onPress={onNotificationPress}
              activeOpacity={0.7}
              disabled={!onNotificationPress}
            >
              <Ionicons name="notifications-outline" size={22} color={colors.text} />
              {hasNotification && <View style={styles.badge} />}
            </TouchableOpacity>
          </>
        ) : (
          <>
            {showBack ? (
              <TouchableOpacity
                style={styles.iconoBoton}
                onPress={onBackPress}
                activeOpacity={0.7}
              >
                <Ionicons name="chevron-back" size={24} color={colors.text} />
              </TouchableOpacity>
            ) : (
              <View style={styles.iconoBoton} />
            )}

            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>

            {rightIcon ? (
              <TouchableOpacity
                style={styles.iconoBoton}
                onPress={onRightPress}
                activeOpacity={0.7}
                disabled={!onRightPress}
              >
                <Ionicons name={rightIcon} size={22} color={colors.text} />
              </TouchableOpacity>
            ) : (
              <View style={styles.iconoBoton} />
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const TAMANO_AVATAR = 44;
const TAMANO_ICONO_BOTON = 40;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
  },
  contenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    minHeight: 60,
  },
  avatar: {
    width: TAMANO_AVATAR,
    height: TAMANO_AVATAR,
    borderRadius: TAMANO_AVATAR / 2,
  },
  avatarPlaceholder: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoGrupo: {
    flex: 1,
    marginLeft: 12,
  },
  greeting: {
    ...typography.title,
    color: colors.text,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: 2,
  },
  title: {
    ...typography.title,
    color: colors.text,
    flex: 1,
    textAlign: 'center',
  },
  iconoBoton: {
    width: TAMANO_ICONO_BOTON,
    height: TAMANO_ICONO_BOTON,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: TAMANO_ICONO_BOTON / 2,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.danger,
    borderWidth: 1.5,
    borderColor: colors.background,
  },
});