import { useState, useEffect, useRef } from 'react';
import { TextInput, TextInput as TI, TouchableWithoutFeedback } from 'react-native';
import { Text, View } from './Custom';
import useDarkMode from '../hooks/darkmode';
import tw from 'twrnc';

/**
 * Input with tags system
 * @arg value - Array of Tag values
 * @arg onChange - Callback to update the value
 * @arg maxTags - Maximum number of allowed tags
 */
function TagInput({
  value,
  onChange,
  maxTags,
}: {
  value: string[];
  onChange: (value: string[]) => void;
  maxTags?: number;
}) {
  const [tags, setTags] = useState<string[]>(value);
  const [inputValue, setInputValue] = useState<string | undefined>('');
  const [errorMessage, setErrorMessage] = useState<string>();
  const inputRef = useRef<TextInput>(null);
  const { colorScheme } = useDarkMode();

  useEffect(() => {
    onChange(tags);
  }, [tags]);

  const onKeyPress = (e: { nativeEvent: { key: string } }) => {
    // if backspace is pressed on an empty input, set inputValue to undefined (instead of empty string)
    if (e.nativeEvent.key === 'Backspace' && inputValue === '') setInputValue(undefined);
    // if backspace is pressed and inputvalue is undefined == double backspace -> remove last tag
    if (e.nativeEvent.key === 'Backspace' && inputValue === undefined) {
      setInputValue(tags.pop() ?? ''); // remove last tag, change input to last tag, or empty string
      setTags([...tags]);
      if (maxTags !== undefined && tags.length <= maxTags) setErrorMessage('');
    }
  };
  const onSubmitEditing = () => {
    // if Enter is pressed and input is valid, add tag and reset input
    if (inputValue?.trim() !== '') {
      // check max tags limit if provided
      if (maxTags !== undefined && tags.length >= maxTags)
        return setErrorMessage(`Max ${maxTags} tags`);
      setTags([...tags, inputValue!]);
      setInputValue('');
    }
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
        <View className="flex w-full flex-row flex-wrap rounded-md border-2 border-slate-700 py-2 px-2">
          <View className="flex flex-row flex-wrap ">
            {tags.map((text) => (
              <Tag key={text} value={text} />
            ))}
          </View>
          <TextInput
            placeholderTextColor={colorScheme === 'light' ? '#9ca3af' : '#4b5563'}
            style={tw`pl-2 text-slate-900 dark:text-neutral-50`}
            placeholder="Enter to add tags"
            ref={inputRef}
            value={inputValue}
            blurOnSubmit={false} // prevent keyboard from closing on submit
            onChange={(e) => setInputValue(e.nativeEvent.text)}
            onKeyPress={onKeyPress}
            onSubmitEditing={onSubmitEditing}
          />
        </View>
      </TouchableWithoutFeedback>
      <Text className="ml-2 mt-1 text-red-600">{errorMessage}</Text>
    </View>
  );
}

function Tag({ value }: { value: string }) {
  return (
    <Text className="mx-0.5 mb-1 rounded-md bg-slate-300 px-2 py-0.5 text-slate-900">
      {value}
    </Text>
  );
}

function DetailTag({ title }: { title: string }) {
  return (
    <Text className="mr-2 mb-2 self-start rounded-md bg-slate-300 px-2 py-1 text-center text-slate-800">
      {title}
    </Text>
  );
}

function Tags({ details }: { details: string[] }) {
  return (
    <View className="my-2 flex-row flex-wrap">
      {details.map((detail) => (
        <DetailTag key={detail} title={detail} />
      ))}
    </View>
  );
}

export default Tag;
export { Tag, Tags, TagInput, DetailTag };
