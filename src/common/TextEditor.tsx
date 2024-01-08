/* eslint-disable @typescript-eslint/no-explicit-any */
import { editorKey } from "@/routes";
import { Editor } from "@tinymce/tinymce-react";

interface TextEditorProps<T> {
  fieldName?: keyof T;
  setForm?: React.Dispatch<React.SetStateAction<T>>;
  onDescriptionChange?: (newDescription: string) => void;
  existingDescription?: string;
  disabled?: boolean;
  width?: number;
  height?: number;
}

const TextEditor = <T,>({
  fieldName,
  setForm,
  onDescriptionChange,
  existingDescription,
  disabled = false,
  width,
  height = 300,
}: TextEditorProps<T>) => {
  const handleEditorChange = (_newValue: string, editor: any) => {
    const newDescription = editor.getContent({ format: "text" });
    if (setForm && fieldName)
      setForm((prevForm) => ({
        ...prevForm,
        [fieldName]: newDescription,
      }));
    if (onDescriptionChange) {
      onDescriptionChange(newDescription);
    }
  };

  return (
    <>
      <Editor
        apiKey={editorKey}
        onEditorChange={handleEditorChange}
        initialValue={existingDescription}
        disabled={disabled}
        init={{
          height: height,
          width: width,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </>
  );
};

export default TextEditor;
