import { AvatarProps as MuiAvatarProps } from '@mui/material/Avatar';

export type AvatarProps = MuiAvatarProps & {
  size?: 'large' | 'medium' | 'small' | 'xsmall';
};

declare const Avatar: (props: AvatarProps) => JSX.Element;
export default Avatar;
