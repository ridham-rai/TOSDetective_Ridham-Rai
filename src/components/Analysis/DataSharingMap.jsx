import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { FiShare2, FiLoader, FiInfo } from 'react-icons/fi';
import { analyzeDataSharing } from '../../services/geminiService';

// Custom node component for better styling
const CustomNode = ({ data }) => {
  const getNodeStyle = (type) => {
    switch (type) {
      case 'source':
        return 'bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900/30 dark:border-blue-600 dark:text-blue-200';
      case 'primary':
        return 'bg-green-100 border-green-300 text-green-800 dark:bg-green-900/30 dark:border-green-600 dark:text-green-200';
      case 'third-party':
        return 'bg-red-100 border-red-300 text-red-800 dark:bg-red-900/30 dark:border-red-600 dark:text-red-200';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200';
    }
  };

  return (
    <div className={`px-4 py-2 shadow-md rounded-md border-2 ${getNodeStyle(data.type)}`}>
      <div className="font-bold text-sm">{data.label}</div>
      {data.description && (
        <div className="text-xs mt-1 opacity-75">{data.description}</div>
      )}
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

function DataSharingMap({ originalText }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [error, setError] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const analyzeDataSharingPractices = async () => {
    if (!originalText) return;

    setIsAnalyzing(true);
    setError(null);
    setAnalysisComplete(false);

    try {
      console.log('Starting data sharing analysis...');
      const analysis = await analyzeDataSharing(originalText);
      console.log('Data sharing analysis result:', analysis);

      if (analysis && analysis.nodes && analysis.edges) {
        // Convert nodes to ReactFlow format
        const flowNodes = analysis.nodes.map((node, index) => ({
          id: node.id,
          type: 'custom',
          position: getNodePosition(index, analysis.nodes.length),
          data: {
            label: node.label,
            type: node.type,
            description: node.description
          },
        }));

        // Convert edges to ReactFlow format
        const flowEdges = analysis.edges.map((edge, index) => ({
          id: `edge-${index}`,
          source: edge.from,
          target: edge.to,
          label: edge.label,
          data: {
            clause: edge.clause,
            description: edge.description
          },
          style: {
            stroke: getEdgeColor(edge.label),
            strokeWidth: 2,
          },
          markerEnd: {
            type: 'arrowclosed',
            color: getEdgeColor(edge.label),
          },
        }));

        setNodes(flowNodes);
        setEdges(flowEdges);
        setAnalysisComplete(true);
      } else {
        setError('Invalid analysis response format');
      }
    } catch (error) {
      console.error('Error analyzing data sharing:', error);
      setError('Failed to analyze data sharing practices. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Helper function to position nodes in a circle
  const getNodePosition = (index, total) => {
    const radius = 200;
    const angle = (index * 2 * Math.PI) / total;
    return {
      x: 300 + radius * Math.cos(angle),
      y: 200 + radius * Math.sin(angle),
    };
  };

  // Helper function to get edge colors based on data type
  const getEdgeColor = (label) => {
    const lowerLabel = label.toLowerCase();
    if (lowerLabel.includes('personal') || lowerLabel.includes('private')) return '#ef4444';
    if (lowerLabel.includes('analytics') || lowerLabel.includes('usage')) return '#f59e0b';
    if (lowerLabel.includes('marketing') || lowerLabel.includes('advertising')) return '#8b5cf6';
    return '#6b7280';
  };

  const onEdgeClick = (event, edge) => {
    setSelectedEdge(edge);
  };

  // Don't auto-analyze, let user click the button
  // useEffect(() => {
  //   if (originalText && !analysisComplete && !isAnalyzing) {
  //     analyzeDataSharingPractices();
  //   }
  // }, [originalText]);

  if (!originalText) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <FiShare2 className="h-6 w-6 text-blue-500" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Data Sharing Map</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300">Upload a document to see data sharing visualization.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FiShare2 className="h-6 w-6 text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Data Sharing Map</h3>
          </div>
          <button
            onClick={analyzeDataSharingPractices}
            disabled={isAnalyzing}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-md transition-colors"
          >
            {isAnalyzing ? (
              <FiLoader className="h-4 w-4 animate-spin" />
            ) : (
              <FiShare2 className="h-4 w-4" />
            )}
            {isAnalyzing ? 'Analyzing...' : analysisComplete ? 'Re-analyze' : 'Analyze Data Sharing'}
          </button>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          Interactive visualization of how your data flows between the company and third parties.
        </p>
      </div>

      <div className="h-96 relative">
        {isAnalyzing && (
          <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 flex items-center justify-center z-10">
            <div className="flex items-center gap-3">
              <FiLoader className="h-6 w-6 animate-spin text-blue-500" />
              <span className="text-gray-700 dark:text-gray-300">Analyzing data sharing practices...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <FiInfo className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <p className="text-red-600 dark:text-red-400">{error}</p>
              <button
                onClick={analyzeDataSharingPractices}
                className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {analysisComplete && nodes.length > 0 && (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onEdgeClick={onEdgeClick}
            nodeTypes={nodeTypes}
            fitView
            className="bg-gray-50 dark:bg-gray-900"
          >
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        )}

        {analysisComplete && nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <FiInfo className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 dark:text-gray-400">No data sharing practices detected in this document.</p>
            </div>
          </div>
        )}
      </div>

      {/* Edge Details Panel */}
      {selectedEdge && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600"
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900 dark:text-white">Data Flow Details</h4>
            <button
              onClick={() => setSelectedEdge(null)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              ×
            </button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            <strong>Data Type:</strong> {selectedEdge.label}
          </p>
          {selectedEdge.data?.clause && (
            <div className="text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 p-2 rounded border">
              <strong>Related Clause:</strong> {selectedEdge.data.clause}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default DataSharingMap;
