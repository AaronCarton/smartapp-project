import useDarkMode from '../../hooks/darkmode';
import {
  Text as RNtext,
  View as RNview,
  TextInput as RNinput,
  Pressable,
} from 'react-native';
import { TextProps, ViewProps, TextInputProps } from 'react-native';
import { create } from 'twrnc';
const tw = create(require(`./../../tailwind.config`));

type CustomTextProps = {
  className?: string;
  children?: React.ReactNode;
  ref?: React.Ref<RNtext>;
} & TextProps;

const Text = ({ className, children, ref, ...props }: CustomTextProps): JSX.Element => {
  const { colorScheme } = useDarkMode();
  const defaultColor = colorScheme === 'light' ? 'text-slate-900' : 'text-neutral-50';
  return (
    <RNtext
      style={tw`font-comfortaa ${defaultColor} ${className ?? ''}`}
      ref={ref}
      {...props}
    >
      {children}
    </RNtext>
  );
};

type CustomInputProps = {
  className?: string;
  children?: React.ReactNode;
  ref?: React.Ref<RNinput>;
} & TextInputProps;

const TextInput = ({
  className,
  children,
  ref,
  ...props
}: CustomInputProps): JSX.Element => {
  const { colorScheme } = useDarkMode();
  const defaultColor = colorScheme === 'light' ? 'text-slate-900' : 'text-neutral-50';
  return (
    <RNinput
      ref={ref}
      style={tw`${defaultColor} ${className ?? ''}`}
      placeholderTextColor={colorScheme === 'light' ? '#9ca3af' : '#4b5563'}
      {...props}
    >
      {children}
    </RNinput>
  );
};

type CustomViewProps = {
  className?: string;
  children?: React.ReactNode;
  ref?: React.Ref<RNview>;
} & ViewProps;

const View = ({ className, children, ref, ...props }: CustomViewProps): JSX.Element => {
  const { colorScheme } = useDarkMode();
  return (
    <RNview style={tw`${className ?? ''}`} ref={ref} {...props}>
      {children}
    </RNview>
  );
};

interface CustomButtonProps {
  title: string;
  className?: string;
  textStyle?: string;
  onPress: () => void;
}

function Button({
  title,
  className,
  textStyle,
  onPress,
}: CustomButtonProps): JSX.Element {
  return (
    <Pressable
      style={tw`px-10 py-2 bg-red-500 rounded-md items-center justify-center ${
        className ?? ''
      }`}
      onPress={onPress}
    >
      <Text
        className={`font-comfortaa_bold text-base leading-6 tracking-wide text-white ${
          textStyle ?? ''
        }`}
      >
        {title}
      </Text>
    </Pressable>
  );
}

export { Text, TextInput, View, Button, tw };
export { CustomTextProps, CustomInputProps, CustomViewProps };
