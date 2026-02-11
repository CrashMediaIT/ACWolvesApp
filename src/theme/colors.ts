/**
 * Arctic Wolves Design Tokens
 *
 * Sourced from the Arctic_Wolves web application style guide
 * (css/style-guide.css) so that the mobile app matches the
 * look-and-feel of the main dashboard.
 */

const colors = {
  /** Main background */
  bgMain: '#0A0A0F',
  /** Secondary / header background */
  bgSecondary: '#13131A',
  /** Card and panel backgrounds */
  bgCard: '#16161F',

  /** Primary brand color – Deep Purple */
  primary: '#6B46C1',
  /** Primary hover state */
  primaryHover: '#7C3AED',
  /** Lighter purple accent */
  primaryLight: '#8B5CF6',

  /** Primary text */
  textWhite: '#FFFFFF',
  /** Secondary / muted text */
  textSecondary: '#A8A8B8',
  /** Very muted text */
  textMuted: '#6B6B7B',

  /** Default border color */
  border: '#2D2D3F',

  /** Semantic status colours */
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  danger: '#DC2626',
} as const;

export default colors;
