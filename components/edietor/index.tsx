"use client";
// InitializedMDXEditor.tsx
import type { ForwardedRef } from "react";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  toolbarPlugin,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  UndoRedo,
  Separator,
  BoldItalicUnderlineToggles,
  ListsToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  InsertCodeBlock,
  linkPlugin,
  linkDialogPlugin,
  tablePlugin,
  imagePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import "./dark-editor.css";
import { basicDark } from "cm6-theme-basic-dark";
import { useTheme } from "next-themes";

interface Props {
  value: string;
  fieldChange: (value: string) => void;
  editorRef: ForwardedRef<MDXEditorMethods> | null;
}

const Edietor = ({ fieldChange, value, editorRef, ...props }: Props) => {
  const { resolvedTheme } = useTheme();

  const theme = resolvedTheme === "dark" ? [basicDark] : [];
  return (
    <div>
      <MDXEditor
        key={resolvedTheme}
        className="grid background-light800_dark200 light-border-2 markdown-editor dark-editor w-full border"
        markdown={value}
        onChange={fieldChange}
        plugins={[
          // Example Plugin Usage
          headingsPlugin(),
          listsPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          tablePlugin(),
          imagePlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: "" }),
          codeMirrorPlugin({
            codeBlockLanguages: {
              css: "css",
              txt: "txt",
              sql: "sql",
              html: "html",
              js: "javascript",
              sass: "sass",
              bash: "bash",
              json: "json",
              ts: "typescript",
              "" : "unspecified",
              tsx: "tupescript (react)",
              jsx: "javascript (react)",
            },
            autoLoadLanguageSupport: true,
            codeMirrorExtensions: theme,
          }),

          diffSourcePlugin({viewMode: "rich-text", diffMarkdown: ""}),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          toolbarPlugin({
            toolbarContents: () => {
              return (
                <ConditionalContents
                  options={[
                    {
                      when: (editor) => editor?.editorType === "codeblock",
                      contents: () => <ChangeCodeMirrorLanguage />,
                    },
                    {
                      fallback: () => (
                        <>
                          <UndoRedo />
                          <Separator />

                          <BoldItalicUnderlineToggles />
                          <Separator />

                          <ListsToggle />
                          <Separator />

                          <CreateLink />
                          <InsertImage />
                          <Separator />

                          <InsertTable />
                          <InsertThematicBreak />

                          <InsertCodeBlock />
                        </>
                      ),
                    },
                  ]}
                />
              );
            },
          }),
        ]}
        {...props}
        ref={editorRef}
      />
    </div>
  );
};

export default Edietor;
