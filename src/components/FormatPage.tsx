import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import toast from 'react-hot-toast';
import { 
  Upload, 
  Copy, 
  Download, 
  CheckCircle, 
  AlertCircle, 
  FileText,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { formatJSON, validateJSON, minifyJSON } from '../utils/jsonFormatter';
import { downloadJSON, copyToClipboard } from '../utils/downloadHelper';

const FormatPage: React.FC = () => {
  const [inputJSON, setInputJSON] = useState('');
  const [formattedJSON, setFormattedJSON] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('');
  const [isMinified, setIsMinified] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setInputJSON(content);
        handleFormat(content);
        toast.success('File uploaded successfully!');
      };
      reader.readAsText(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json'],
      'text/plain': ['.txt'],
    },
    multiple: false,
  });

  const handleFormat = (jsonString: string = inputJSON) => {
    if (!jsonString.trim()) {
      setFormattedJSON('');
      setIsValid(true);
      setError('');
      return;
    }

    const result = formatJSON(jsonString);
    setFormattedJSON(result.formatted);
    setIsValid(result.isValid);
    setError(result.error || '');
    setIsMinified(false);

    if (result.isValid) {
      toast.success('JSON formatted successfully!');
    } else {
      toast.error(`Invalid JSON: ${result.error}`);
    }
  };

  const handleMinify = () => {
    if (isValid && inputJSON.trim()) {
      const minified = minifyJSON(inputJSON);
      setFormattedJSON(minified);
      setIsMinified(true);
      toast.success('JSON minified successfully!');
    }
  };

  const handleCopy = async () => {
    if (formattedJSON) {
      const success = await copyToClipboard(formattedJSON);
      if (success) {
        toast.success('Copied to clipboard!');
      } else {
        toast.error('Failed to copy to clipboard');
      }
    }
  };

  const handleDownload = () => {
    if (formattedJSON) {
      const filename = isMinified ? 'minified.json' : 'formatted.json';
      downloadJSON(formattedJSON, filename);
      toast.success('File downloaded successfully!');
    }
  };

  const handleClear = () => {
    setInputJSON('');
    setFormattedJSON('');
    setIsValid(true);
    setError('');
    setIsMinified(false);
    toast.success('Cleared successfully!');
  };

  return (
    <section id="format" className="py-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            JSON Formatter
          </h2>
          <p className="text-xl text-gray-300">
            Paste, upload, or drag your JSON data to format and validate
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Drag & Drop Zone */}
            <motion.div
              {...getRootProps()}
              className={`glass rounded-2xl p-6 border-2 border-dashed transition-all duration-300 cursor-pointer ${
                isDragActive 
                  ? 'border-blue-400 bg-blue-400/10' 
                  : 'border-gray-600 hover:border-gray-500'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <input {...getInputProps()} />
              <div className="text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg text-gray-300 mb-2">
                  {isDragActive ? 'Drop your JSON file here' : 'Drag & drop JSON file'}
                </p>
                <p className="text-sm text-gray-500">or click to select file</p>
              </div>
            </motion.div>

            {/* Text Area */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Input JSON
                </h3>
                <div className="flex items-center space-x-2">
                  {inputJSON && (
                    <div className="flex items-center">
                      {isValid ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-400" />
                      )}
                    </div>
                  )}
                </div>
              </div>
              <textarea
                value={inputJSON}
                onChange={(e) => setInputJSON(e.target.value)}
                placeholder="Paste your JSON data here..."
                className="w-full h-64 bg-zinc-900 text-gray-300 rounded-xl p-4 border border-gray-600 focus:border-blue-400 focus:outline-none resize-none font-mono text-sm"
              />
              {error && (
                <motion.p
                  className="text-red-400 text-sm mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
                </motion.p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <motion.button
                onClick={() => handleFormat()}
                disabled={!inputJSON.trim()}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className="h-4 w-4" />
                <span>Format</span>
              </motion.button>

              <motion.button
                onClick={handleMinify}
                disabled={!isValid || !inputJSON.trim()}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Minify
              </motion.button>

              <motion.button
                onClick={handleClear}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Trash2 className="h-4 w-4" />
                <span>Clear</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Output Section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  {isMinified ? 'Minified JSON' : 'Formatted JSON'}
                </h3>
                <div className="flex items-center space-x-2">
                  {formattedJSON && (
                    <>
                      <motion.button
                        onClick={handleCopy}
                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Copy to clipboard"
                      >
                        <Copy className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        onClick={handleDownload}
                        className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Download file"
                      >
                        <Download className="h-4 w-4" />
                      </motion.button>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-zinc-900 rounded-xl overflow-hidden border border-gray-600">
                {formattedJSON ? (
                  <SyntaxHighlighter
                    language="json"
                    style={oneDark}
                    customStyle={{
                      margin: 0,
                      padding: '1rem',
                      background: 'transparent',
                      fontSize: '14px',
                      fontFamily: '"Chakra Petch", monospace',
                      userSelect: 'text',
                      WebkitUserSelect: 'text',
                      MozUserSelect: 'text',
                      msUserSelect: 'text',
                      outline: 'none',
                      border: 'none',
                      boxShadow: 'none',
                    }}
                    wrapLines={true}
                    wrapLongLines
                    showLineNumbers={false}
                    showInlineLineNumbers={false}
                    PreTag="div"
                    CodeTag="code"
                    useInlineStyles={true}
                  >
                    {formattedJSON}
                  </SyntaxHighlighter>
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Formatted JSON will appear here</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FormatPage;