import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';

const nodeDetails = {
  '6': 'Details zu Services & Resources...',
  '7': 'Details zum Structured Program...',
  '8': 'Hier stehen Informationen über Decision Processes...',
  '9': 'Beschreibung der verwendeten Metriken...',
  '10': 'Details zur Contracting Policy...',
};

const rawData = {
  nodes: [
    { id: '1', label: 'Governance Dimensions and their Mechanisms', children: ['2', '3', '4', '5'] },
    { id: '2', label: 'Processes & Operations', children: ['6', '7', '8', '9', '10'] },
      { id: '6', label: 'Services & Resources', children: [] },
      { id: '7', label: 'Structured Program', children: [] },
      { id: '8', label: 'Decision Processes', children: [] },
      { id: '9', label: 'Metrics', children: [] },
      { id: '10', label: 'Contracting Policy', children: [] },

    { id: '3', label: 'Structures', children: ['11', '12', '13', '14', '15'] },
      { id: '11', label: 'Entity', children: [] },
      { id: '12', label: 'Corporate Management', children: [] },
      { id: '13', label: 'Program Management', children: [] },
      { id: '14', label: 'Location', children: [] },
      { id: '15', label: 'Branding', children: [] },

    { id: '4', label: 'Relational Mechanisms', children: ['16', '17', '18', '19'] },
      { id: '16', label: 'Collaboration & Communication', children: [] },
      { id: '17', label: 'Interplay & Networking', children: [] },
      { id: '18', label: 'Roles', children: [] },
      { id: '19', label: 'Values & Culture', children: [] },

    { id: '5', label: 'Autonomy', children: [] },

  ],
    parentMap: {
    '2': '1',
    '3': '1',
    '4': '1',
    '5': '1',
    '6': '2',
    '7': '2',
    '8': '2',
    '9': '2',
    '10': '2',
  },
};

const center = { x: 300, y: 200 };


const mainDimensionIds = ['2', '3', '4', '5']; // IDs der Hauptknoten
const dummyAssignment = {
  '6': 'inside-out',
  '7': 'inside-out',
  '8': 'outside-in',
  '9': 'outside-in',
  '10': 'inside-out',
  '11': 'outside-in',
  '12': 'inside-out',
  '13': 'outside-in',
  '14': 'inside-out',
  '15': 'outside-in',
  '16': 'inside-out',
  '17': 'outside-in',
  '18': 'inside-out',
  '19': 'outside-in',
};

export default function Mindmap() {
  const [focusId, setFocusId] = useState('1');
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [popupContent, setPopupContent] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null); // 'inside-out' | 'outside-in'
  const layoutRef = useRef(() => {});

  const layout = useCallback(() => {
    const focusNode = rawData.nodes.find((n) => n.id === focusId);
    const childIds = focusNode?.children || [];
    const children = childIds
      .map((id) => rawData.nodes.find((n) => n.id === id))
      .filter((n) => n && n.id && n.label);

    // gleichmäßige Verteilung im Kreis
    const angleStep = (2 * Math.PI) / Math.max(children.length, 1);

    // Automatisch Radius erhöhen je mehr Kinder es gibt
    const baseRadius = 250;
    const radius = baseRadius + children.length * 40;

  const newNodes = [
    {
      id: focusNode.id,
      data: { label: focusNode.label },
      position: center,
      style: { fontWeight: 'bold', fontSize: 18 },
      draggable: false,
    },
    ...children.map((child, index) => {
      const angle = (index + 0.5) * angleStep;  
      
      const isMainDimension = mainDimensionIds.includes(child.id);
      const isHighlighted = !activeFilter || isMainDimension || dummyAssignment[child.id] === activeFilter;

      return {
        id: child.id,
        data: { label: child.label },
        position: {
          x: center.x + radius * Math.cos(angle),
          y: center.y + radius * Math.sin(angle),

        },
        draggable: false,
        connectable: false,
        style: {
          opacity: isHighlighted ? 1 : 0.2,
          pointerEvents: isHighlighted ? 'auto' : 'none',
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '10px',
          fontWeight: 'bold',
          fontSize: 14,
        },
      };
    }),
  ];

    const newEdges = children.map((child) => ({
      id: `e${focusNode.id}-${child.id}`,
      source: focusNode.id,
      target: child.id,
    }));

    setNodes(newNodes);
    setEdges(newEdges);
  }, [focusId, setNodes, setEdges, activeFilter]);

  layoutRef.current = layout;

  useEffect(() => {
    layout();
  }, [focusId, layout, activeFilter]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = (event, node) => {
    if (node.id === focusId) {
      const parentId = rawData.parentMap[focusId];
      if (parentId) {
        setFocusId(parentId);
      }
      return;
    }

    const fullNode = rawData.nodes.find((n) => n.id === node.id);
    if (fullNode?.children?.length > 0) {
      setFocusId(node.id);
    } else {
      const content = nodeDetails[node.id] || 'Keine weiteren Informationen verfügbar.';
      setPopupContent({ title: fullNode.label, text: content });
    }
  };

  const closePopup = () => {
    setPopupContent(null);
  };

  return (
      <div style={{ height: '80vh', width: '100%', position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            right: '20px',
            top: '100px',
            backgroundColor: '#ffffffcc',
            padding: '12px',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <h4 style={{ margin: 0, marginBottom: '10px', fontSize: '14px', color: '#333' }}>Filter Mechanisms</h4>

          <button
            onClick={() => {
              setActiveFilter('inside-out');
              layoutRef.current(); // ✅ sofort anwenden
            }}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#ffa726',
              color: '#333',
              cursor: 'pointer',
            }}
          >
            Inside-out
          </button>

          <button
            onClick={() => {
              setActiveFilter('outside-in');
              layoutRef.current();
            }}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#ffa726',
              color: '#333',
              cursor: 'pointer',
            }}
          >
            Outside-in
          </button>

          <button
            onClick={() => {
              setActiveFilter(null);
              layoutRef.current();
            }}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#ffa726',
              color: '#333',
              cursor: 'pointer',
            }}
          >Reset</button>
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodesDraggable={false}
          connectable={false}
          fitView
        >
          <Controls />
          <Background />
        </ReactFlow>

        {popupContent && (
          <div
            style={{
              position: 'absolute',
              top: '20%',
              left: '20%',
              width: '60%',
              background: 'white',
              padding: '20px',
              boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
              borderRadius: '8px',
              zIndex: 10,
            }}
          >
            <h2>{popupContent.title}</h2>
            <p>{popupContent.text}</p>
            <button onClick={closePopup} style={{ marginTop: '1rem' }}>
              Schließen
            </button>
          </div>
        )}
      </div>
  );
}
