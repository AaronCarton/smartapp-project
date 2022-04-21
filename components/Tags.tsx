import { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback } from 'react-native';
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

  useEffect(() => {
    onChange(tags);
  }, [tags]);

  const onKeyPress = (e: { nativeEvent: { key: string } }) => {
    // if backspace is pressed on an empty input, set inputValue to undefined (instead of empty string)
    if (e.nativeEvent.key === 'Backspace' && inputValue === '')
      setInputValue(undefined);
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
        <View
          style={tw`flex border-2 border-slate-700 rounded-md flex-wrap flex-row w-full py-2 px-2`}
        >
          <View style={tw`flex flex-wrap flex-row `}>
            {tags.map((text) => (
              <Tag key={text} value={text} />
            ))}
          </View>
          <TextInput
            style={tw`pl-2 text-slate-900`}
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
      <Text style={tw`text-red-600 ml-2 mt-1`}>{errorMessage}</Text>
    </View>
  );
}

function Tag({ value }: { value: string }) {
  return (
    <Text style={tw`bg-slate-300 text-slate-900 rounded-md px-2 py-0.5 mx-0.5 mb-1`}>
      {value}
    </Text>
  );
}

function DetailTag({ title }: { title: string }) {
  return (
    <Text
      style={tw`rounded-md bg-slate-300 text-slate-800 text-center self-start px-2 py-1 mr-2 mb-2`}
    >
      {title}
    </Text>
  );
}

function Tags({ details }: { details: string[] }) {
  return (
    <View style={tw`flex-row flex-wrap my-2`}>
      {details.map((detail) => (
        <DetailTag key={detail} title={detail} />
      ))}
    </View>
  );
}

export default Tag;
export { Tag, Tags, TagInput, DetailTag };
