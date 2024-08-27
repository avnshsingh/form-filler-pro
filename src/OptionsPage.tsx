import React, { useState, useEffect } from "react";
import { toast } from "./components/ui/use-toast";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Button } from "./components/ui/button";

interface FormField {
  name: string;
  value: string;
  shortcut: string;
}

const OptionsPage: React.FC = () => {
  const [fields, setFields] = useState<FormField[]>([]);

  useEffect(() => {
    // Load existing fields
    chrome.storage.local.get("formFields", result => {
      const savedFields = result.formFields || [];
      setFields(savedFields);
    });
  }, []);

  const addField = () => {
    setFields([...fields, { name: "", value: "", shortcut: "" }]);
  };

  const updateField = (index: number, key: keyof FormField, value: string) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    setFields(updatedFields);
  };

  const removeField = (index: number) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "The field value has been copied to your clipboard.",
      });
    });
  };

  const handleShortcutKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    const key = e.key.toUpperCase();
    const isCtrl = e.ctrlKey ? "Ctrl+" : "";
    const isAlt = e.altKey ? "Alt+" : "";
    const isShift = e.shiftKey ? "Shift+" : "";
    const shortcut = `${isCtrl}${isAlt}${isShift}${key}`;
    updateField(index, "shortcut", shortcut);
  };

  const saveFields = () => {
    chrome.storage.local.set({ formFields: fields }, () => {
      toast({
        title: "Form fields saved",
        description: "Your custom form fields have been saved successfully.",
      });
    });
  };

  return (
    <div className="container mx-auto p-4 bg-orange-50">
      <h2 className="text-2xl font-bold mb-4">Customise the Form Data</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          saveFields();
        }}
      >
        <div className="grid grid-cols-3">
          {fields.map((field, index) => (
            <div
              key={index}
              className="flex flex-col space-y-2 p-4 border rounded-lg"
            >
              <Input
                type="text"
                placeholder="Name"
                value={field.name}
                onChange={e => updateField(index, "name", e.target.value)}
                className="w-full"
              />
              <Textarea
                placeholder="Value"
                value={field.value}
                onChange={e => updateField(index, "value", e.target.value)}
                className="w-full"
              />
              <Input
                type="text"
                placeholder="Shortcut"
                value={field.shortcut}
                onKeyDown={e => handleShortcutKeyDown(e, index)}
                readOnly
                className="w-full"
              />
              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeField(index)}
                >
                  Remove
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-2 border-orange-500"
                  onClick={() => copyToClipboard(field.value)}
                >
                  Copy
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 space-x-2">
          <Button type="button" onClick={addField}>
            Add Field
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
};

export default OptionsPage;
