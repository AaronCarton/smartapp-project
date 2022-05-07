import { Text, TextInput, View } from './Custom';
import { TextInputProps } from 'react-native';
import { useEffect, useState } from 'react';

export type InputFieldProps = {
  title: string;
  titleStyle?: string;
  regex?: RegExp;
} & TextInputProps;

function InputField({ title, titleStyle, regex, ...props }: InputFieldProps) {
  const [error, setError] = useState(false);

  useEffect(() => {
    if (props.value == undefined || props.value == '') return setError(false);
    setError((regex && !props.value?.match(regex)) ?? false);
  }, [props.value]);
  return (
    <View className="mb-2">
      <Text
        className={`mb-0.5 font-comfortaa_bold text-slate-600 ${titleStyle} ${
          error ? 'text-red-500 dark:text-red-500' : ''
        } `}
      >
        {`${title} ${error ? 'incorrect' : ''}`}
      </Text>
      <TextInput
        className={`rounded-md border-2 border-slate-700 py-1 px-3 ${
          error ? 'border-red-400 text-red-500 dark:text-red-500' : ''
        }`}
        {...props}
      />
    </View>
  );
}

export default InputField;
