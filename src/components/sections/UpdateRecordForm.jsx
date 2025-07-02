'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Plus, Trash2, GripVertical, Upload, Star, Edit } from 'lucide-react';
import suggestionsData from '@/data/suggestions.json';
import AutoCompleteInput from '@/components/ui/AutoCompleteInput';
import MetadataModal from '@/components/modals/MetadataModal';

// --- UTILITY FUNCTIONS ---

const generateUniqueId = () => `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

const sectionSuggestions = suggestionsData.sections.map(s => s.title);
const sectionMap = new Map(suggestionsData.sections.map(s => [s.title, s]));

const getFieldSuggestionsForSection = (sectionTitle) => {
  const section = sectionMap.get(sectionTitle);
  return section ? section.fields.map(f => f.label) : [];
};

const getFieldDetails = (sectionTitle, fieldLabel) => {
  const section = sectionMap.get(sectionTitle);
  if (!section) return null;
  return section.fields.find(f => f.label === fieldLabel);
};


// --- REUSABLE & STYLED COMPONENTS ---

const StyledTextarea = (props) => (
  <textarea
    {...props}
    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
  />
);

// --- DYNAMIC TABLE COMPONENTS ---

const DynamicTable = ({ table, onUpdate, onRemove }) => {
  const fileInputRef = useRef(null);

  const updateColumnName = (index, name) => {
    const newColumns = [...table.columns];
    newColumns[index].name = name;
    onUpdate({ ...table, columns: newColumns });
  };

  const addColumn = () => onUpdate({ ...table, columns: [...table.columns, { id: generateUniqueId(), name: `Column ${table.columns.length + 1}` }] });
  const removeColumn = (index) => {
    const newColumns = table.columns.filter((_, i) => i !== index);
    const newRows = table.rows.map(row => ({ ...row, cells: row.cells.filter((_, cellIndex) => cellIndex !== index) }));
    onUpdate({ ...table, columns: newColumns, rows: newRows });
  };

  const addRow = () => onUpdate({ ...table, rows: [...table.rows, { id: generateUniqueId(), cells: table.columns.map(() => '') }] });
  const updateRow = (rowIndex, cellIndex, value) => {
    const newRows = [...table.rows];
    const newCells = [...newRows[rowIndex].cells];
    newCells[cellIndex] = value;
    newRows[rowIndex] = { ...newRows[rowIndex], cells: newCells };
    onUpdate({ ...table, rows: newRows });
  };
  const removeRow = (index) => onUpdate({ ...table, rows: table.rows.filter((_, i) => i !== index) });

  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split('\n').filter(line => line.trim() !== '');
      const headers = lines[0].split(',').map(h => ({ id: generateUniqueId(), name: h.trim() }));
      const importedRows = lines.slice(1).map(line => ({ id: generateUniqueId(), cells: line.split(',').map(cell => cell.trim()) }));
      onUpdate({ ...table, columns: headers, rows: importedRows });
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-4 border-2 border-blue-200 rounded-lg bg-blue-50/50">
      <div className="flex justify-between items-center mb-4">
        <AutoCompleteInput type="text" placeholder="Table Name" value={table.name} onChange={(e) => onUpdate({ ...table, name: e.target.value })} className="text-lg font-semibold !border-blue-300" suggestions={[]} />
        <div className="flex items-center gap-2">
          <input type="file" ref={fileInputRef} className="hidden" accept=".csv" onChange={handleFileImport} />
          <button type="button" onClick={() => fileInputRef.current.click()} className="flex items-center bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600"><Upload size={16} className="mr-2" /> Import CSV</button>
          <button type="button" onClick={onRemove} className="p-2 text-red-500 hover:text-red-700"><Trash2 /></button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {table.columns.map((col, index) => (
                <th key={col.id} className="p-1 border border-gray-300 bg-gray-100">
                  <div className="flex items-center gap-1">
                    <AutoCompleteInput value={col.name} onChange={(e) => updateColumnName(index, e.target.value)} suggestions={[]} />
                    <button type="button" onClick={() => removeColumn(index)} className="p-1 text-red-400 hover:text-red-600"><Trash2 size={16} /></button>
                  </div>
                </th>
              ))}
              <th className="p-1 border border-gray-300 bg-gray-100 w-20">Action</th>
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr key={row.id}>
                {row.cells.map((cell, cellIndex) => (
                  <td key={cellIndex} className="p-1 border border-gray-200">
                    <AutoCompleteInput type="text" value={cell} onChange={(e) => updateRow(rowIndex, cellIndex, e.target.value)} suggestions={[]} />
                  </td>
                ))}
                <td className="p-1 border border-gray-200 text-center">
                  <button type="button" onClick={() => removeRow(rowIndex)} className="p-2 text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-4 mt-4">
        <button type="button" onClick={addColumn} className="flex items-center text-blue-600 font-semibold"><Plus className="mr-2" /> Add Column</button>
        <button type="button" onClick={addRow} className="flex items-center text-green-600 font-semibold"><Plus className="mr-2" /> Add Row</button>
      </div>
    </div>
  );
};

// --- FORM FIELD COMPONENT ---

const FormField = ({ field, onUpdate, onRemove, sectionTitle, onEditMetadata }) => {
  const handleLabelChange = (e) => {
    const newLabel = e.target.value;
    const fieldDetails = getFieldDetails(sectionTitle, newLabel);
    onUpdate({
      ...field,
      label: newLabel,
      placeholder: fieldDetails?.placeholder || '',
      name: fieldDetails?.name || '', // Store the machine-readable name
      fieldType: fieldDetails?.type || field.fieldType,
    });
  };

  const renderValueInput = () => {
    const placeholder = field.placeholder || `Enter ${field.label}`;
    switch (field.fieldType) {
      case 'textarea':
        return <StyledTextarea placeholder={placeholder} value={field.value} onChange={(e) => onUpdate({ ...field, value: e.target.value })} />;
      case 'date':
        return <AutoCompleteInput type="date" placeholder={placeholder} value={field.value} onChange={(e) => onUpdate({ ...field, value: e.target.value })} suggestions={[]} />;
      case 'key_value_pair':
        return (
          <div className="flex-grow flex gap-4">
            <AutoCompleteInput placeholder="Key" value={field.key || ''} onChange={(e) => onUpdate({ ...field, key: e.target.value })} suggestions={[]} />
            <AutoCompleteInput placeholder="Value (URL)" value={field.value || ''} onChange={(e) => onUpdate({ ...field, value: e.target.value })} suggestions={[]} />
          </div>
        );
      default: // 'text'
        return <AutoCompleteInput placeholder={placeholder} value={field.value} onChange={(e) => onUpdate({ ...field, value: e.target.value })} suggestions={[]} />;
    }
  };

  return (
    <div className="flex items-center gap-4 p-3 border rounded-lg bg-gray-50">
      <GripVertical className="cursor-move text-gray-400" />
      <div className="w-1/3">
        <AutoCompleteInput placeholder="Field Label" value={field.label} onChange={handleLabelChange} suggestions={getFieldSuggestionsForSection(sectionTitle)} />
      </div>
      {renderValueInput()}
      <select value={field.fieldType} onChange={(e) => onUpdate({ ...field, fieldType: e.target.value, value: '', key: '' })} className="p-2 border border-gray-300 rounded-md shadow-sm">
        <option value="text">Text</option>
        <option value="textarea">Textarea</option>
        <option value="date">Date</option>
        <option value="key_value_pair">Key-Value Pair</option>
      </select>
      <button type="button" onClick={() => onEditMetadata(field)} className="p-2 text-blue-500 hover:text-blue-700"><Edit size={16} /></button>
      <button type="button" onClick={onRemove} className="p-2 text-red-500 hover:text-red-700"><Trash2 /></button>
    </div>
  );
};

// --- FORM SECTION COMPONENT ---

const FormSection = ({ section, onUpdate, onRemove, onEditMetadata, onSaveDraft }) => {
  const [isOpen, setIsOpen] = useState(true);

  const updateElement = (index, updatedElement) => {
    const newElements = [...section.elements];
    newElements[index] = updatedElement;
    onUpdate({ ...section, elements: newElements });
  };

  const addElement = (type) => {
    const newElement = type === 'field'
      ? { id: generateUniqueId(), type: 'field', label: '', value: '', fieldType: 'text', name: '', important: 'normal' }
      : { id: generateUniqueId(), type: 'table', name: 'New Table', columns: [{ id: generateUniqueId(), name: 'Column 1' }], rows: [] };
    onUpdate({ ...section, elements: [...section.elements, newElement] });
  };

  const removeElement = (index) => onUpdate({ ...section, elements: section.elements.filter((_, i) => i !== index) });

  return (
    <div className="mb-6 border-2 border-gray-300 rounded-xl shadow-lg relative">
      <header className="flex justify-between items-center p-3 bg-gray-100 rounded-t-lg cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <AutoCompleteInput placeholder="Section Title" value={section.title} onChange={(e) => onUpdate({ ...section, title: e.target.value })} className="text-xl font-bold !border-gray-300" suggestions={sectionSuggestions} onClick={(e) => e.stopPropagation()} />
        <div className="flex items-center gap-2">
          <button type="button" onClick={(e) => { e.stopPropagation(); onRemove(); }} className="p-2 text-red-500 hover:text-red-700"><Trash2 /></button>
          <ChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </header>
      {isOpen && (
        <div className="p-4 space-y-4">
          {section.elements.map((element, index) => {
            const Component = element.type === 'field' ? FormField : DynamicTable;
            return <Component key={element.id} {...{ [element.type]: element }} onUpdate={(updated) => updateElement(index, updated)} onRemove={() => removeElement(index)} sectionTitle={section.title} onEditMetadata={onEditMetadata} />;
          })}
          <div className="flex justify-center gap-4 pt-4 border-t-2 border-dashed">
            <button type="button" onClick={() => addElement('field')} className="flex items-center py-2 px-4 border-2 border-dashed rounded-lg text-gray-600 hover:bg-gray-50"><Plus className="mr-2" /> Add Field</button>
            <button type="button" onClick={() => addElement('table')} className="flex items-center py-2 px-4 border-2 border-dashed rounded-lg text-blue-600 hover:bg-blue-50"><Plus className="mr-2" /> Add Table</button>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={onSaveDraft}
        className="absolute bottom-2 right-2 bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 text-sm"
      >
        Save Changes
      </button>
    </div>
  );
};

// --- MAIN FORM BUILDER ---

export default function UpdateRecordForm({ onSubmit, initialData }) {
  const isUpdateMode = !!initialData?._id;
  const [category, setCategory] = useState(initialData?.category || 'Posts');
  const [sections, setSections] = useState(initialData?.sections || [{ id: generateUniqueId(), title: '', elements: [] }]);
  const [showIn, setShowIn] = useState({
    jobs: false,
    results: false,
    admitCard: false,
    admission: false,
    syllabus: false,
    answerKey: false,
  });
  const [editingField, setEditingField] = useState(null);

  useEffect(() => {
    if (initialData?.show) {
      setShowIn(initialData.show);
    }
    if (initialData?.sections) {
      setSections(initialData.sections);
    }
    if (initialData?.category) {
      setCategory(initialData.category);
    }
  }, [initialData]);


  const updateSection = (index, updatedSection) => {
    const newSections = [...sections];
    newSections[index] = updatedSection;
    setSections(newSections);
  };

  const addSection = () => setSections([...sections, { id: generateUniqueId(), title: '', elements: [] }]);
  const removeSection = (index) => setSections(sections.filter((_, i) => i !== index));

  const handleShowInChange = (e) => {
    const { name, checked } = e.target;
    setShowIn(prev => ({ ...prev, [name]: checked }));
  };

  const handleEditMetadata = (field) => {
    setEditingField(field);
  };

  const handleSaveMetadata = (metadata) => {
    const newSections = sections.map(section => ({
      ...section,
      elements: section.elements.map(el => {
        if (el.id === editingField.id) {
          return { ...el, ...metadata };
        }
        return el;
      })
    }));
    setSections(newSections);
    setEditingField(null);
  };

  const getPayload = (isDraft = false) => {
    const payload = {
        category,
        show: showIn,
        sections: [],
        pendingForm: isDraft,
    };
    
    sections.forEach(section => {
      const sectionData = {
          id: section.id,
          title: section.title,
          elements: []
      };
      const sectionDetails = sectionMap.get(section.title);
      const sectionId = sectionDetails ? sectionDetails.id : section.title;

      section.elements.forEach(el => {
        if (el.type === 'field') {
          if (el.name) {
            sectionData.elements.push({
                id: el.id,
                type: 'field',
                label: el.label,
                name: el.name,
                value: el.value || '',
                fieldType: el.fieldType,
                important: el.important,
            });
          }
        } else if (el.type === 'table') {
          if (el.name) {
             sectionData.elements.push({
                id: el.id,
                type: 'table',
                name: el.name,
                columns: el.columns,
                rows: el.rows.map(row => {
                    const rowObj = {};
                    el.columns.forEach((col, i) => {
                        if (col.name) {
                        rowObj[col.name] = row.cells[i] || '';
                        }
                    });
                    return rowObj;
                    }),
             });
          }
        }
      });
      if (sectionData.elements.length > 0) {
        payload.sections.push(sectionData);
      }
    });
    console.log("Generated Payload:", payload);
    return payload;
  }

  const handleSaveDraft = () => {
    const payload = getPayload(true);
    console.log("Saving Draft Payload:", payload);
    onSubmit(payload);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = getPayload(false);
    console.log("Final Transformed Payload:", payload);
    onSubmit(payload);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        {isUpdateMode ? 'Update Record' : 'Add New Record'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6 p-4 border-2 border-purple-200 rounded-lg bg-purple-50/50">
            <h3 className="text-xl font-bold mb-2 text-purple-800">Category</h3>
             <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 border border-gray-300 rounded-md shadow-sm w-full">
                <option value="Posts">Posts</option>
                <option value="Admission">Admission</option>
                <option value="Syllabus">Syllabus</option>
                <option value="Answer-Key">Answer-Key</option>
            </select>
        </div>
        <div className="mb-6 p-4 border-2 border-purple-200 rounded-lg bg-purple-50/50">
            <h3 className="text-xl font-bold mb-2 text-purple-800">Display In</h3>
            <div className="flex gap-4 flex-wrap">
                <label className="flex items-center gap-2">
                    <input type="checkbox" name="jobs" checked={showIn.jobs} onChange={handleShowInChange} className="form-checkbox h-5 w-5 text-purple-600" />
                    <span>Jobs</span>
                </label>
                 <label className="flex items-center gap-2">
                    <input type="checkbox" name="results" checked={showIn.results} onChange={handleShowInChange} className="form-checkbox h-5 w-5 text-purple-600" />
                    <span>Results</span>
                </label>
                 <label className="flex items-center gap-2">
                     <input type="checkbox" name="admitCard" checked={showIn.admitCard} onChange={handleShowInChange} className="form-checkbox h-5 w-5 text-purple-600" />
                     <span>Admit Card</span>
                 </label>
                  <label className="flex items-center gap-2">
                     <input type="checkbox" name="admission" checked={showIn.admission} onChange={handleShowInChange} className="form-checkbox h-5 w-5 text-purple-600" />
                     <span>Admission</span>
                 </label>
                  <label className="flex items-center gap-2">
                     <input type="checkbox" name="syllabus" checked={showIn.syllabus} onChange={handleShowInChange} className="form-checkbox h-5 w-5 text-purple-600" />
                     <span>Syllabus</span>
                 </label>
                  <label className="flex items-center gap-2">
                     <input type="checkbox" name="answerKey" checked={showIn.answerKey} onChange={handleShowInChange} className="form-checkbox h-5 w-5 text-purple-600" />
                     <span>Answer Key</span>
                 </label>
             </div>
         </div>
 
         {editingField && (
           <MetadataModal
             field={editingField}
             onSave={handleSaveMetadata}
             onCancel={() => setEditingField(null)}
           />
         )}
 
         {sections.map((section, index) => <FormSection key={section.id} section={section} onUpdate={(updated) => updateSection(index, updated)} onRemove={() => removeSection(index)} onEditMetadata={handleEditMetadata} onSaveDraft={handleSaveDraft} />)}
         <button type="button" onClick={addSection} className="flex items-center justify-center w-full mt-6 py-3 px-6 border-2 border-dashed border-purple-400 rounded-lg text-purple-600 font-semibold hover:bg-purple-50"><Plus className="mr-2" /> Add New Section</button>
         <button type="submit" className="w-full mt-8 bg-green-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-green-700 transition-transform transform hover:scale-105">
           {isUpdateMode ? 'Update Record' : 'Add Record'}
         </button>
       </form>
     </div>
   );
 }
