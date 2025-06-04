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
    '2': '1', '3': '1', '4': '1', '5': '1',
    '6': '2', '7': '2', '8': '2', '9': '2', '10': '2',
    '11': '3', '12': '3', '13': '3', '14': '3', '15': '3',
    '16': '4', '17': '4', '18': '4', '19': '4',
  },
};

const center = { x: 800, y: 400 };
const mainDimensionIds = ['2', '3', '4', '5'];
const dummyAssignment = {
  '6': 'inside-out', '7': 'inside-out', '8': 'outside-in', '9': 'outside-in', '10': 'inside-out',
  '11': 'outside-in', '12': 'inside-out', '13': 'outside-in', '14': 'inside-out', '15': 'outside-in',
  '16': 'inside-out', '17': 'outside-in', '18': 'inside-out', '19': 'outside-in',
};

export default function Mindmap() {
  const [focusId, setFocusId] = useState('1');
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [popupContent, setPopupContent] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);
  const layoutRef = useRef(() => {});

  const layout = useCallback(() => {
    if (focusId === 'all') {
      const baseRadius = 150;
      const allNodes = new Map();
      const edgesList = [];

      const buildCircularLayout = (nodeId, level = 0, angleStart = 0, angleEnd = 2 * Math.PI) => {
        const children = rawData.nodes.find(n => n.id === nodeId)?.children || [];
        const radius = baseRadius + level * 180;
        const angleStep = (angleEnd - angleStart) / Math.max(children.length, 1);

        allNodes.set(nodeId, {
          id: nodeId,
          data: { label: rawData.nodes.find(n => n.id === nodeId)?.label || nodeId },
          position: level === 0
            ? center
            : {
                x: center.x + radius * Math.cos((angleStart + angleEnd) / 2),
                y: center.y + radius * Math.sin((angleStart + angleEnd) / 2),
              },
          draggable: false,
          connectable: false,
          style: {
            opacity: 1,
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '10px',
            fontWeight: 'bold',
            fontSize: 14,
          },
        });

        children.forEach((childId, i) => {
          const childAngleStart = angleStart + i * angleStep;
          const childAngleEnd = angleStart + (i + 1) * angleStep;

          edgesList.push({
            id: `e${nodeId}-${childId}`,
            source: nodeId,
            target: childId,
          });

          buildCircularLayout(childId, level + 1, childAngleStart, childAngleEnd);
        });
      };

      buildCircularLayout('1');
      setNodes(Array.from(allNodes.values()));
      setEdges(edgesList);
      return;
    }

    const focusNode = rawData.nodes.find((n) => n.id === focusId);
    const childIds = focusNode?.children || [];
    const children = childIds
      .map((id) => rawData.nodes.find((n) => n.id === id))
      .filter(Boolean);

    const angleStep = (2 * Math.PI) / Math.max(children.length, 1);
    const radius = 250 + children.length * 40;

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
        const isMain = mainDimensionIds.includes(child.id);
        const isHighlighted = !activeFilter || isMain || dummyAssignment[child.id] === activeFilter;

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
  }, [focusId, activeFilter]);

  layoutRef.current = layout;

  useEffect(() => {
    layout();
  }, [focusId, layout, activeFilter]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onNodeClick = (event, node) => {
    if (focusId === 'all') return;
    if (node.id === focusId) {
      const parentId = rawData.parentMap[focusId];
      if (parentId) setFocusId(parentId);
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

  const closePopup = () => setPopupContent(null);

  return (
    <div style={{ height: '80vh', width: '100%', position: 'relative' }}>
      <div className="mindmap-controls">
        <h4>Filter Mechanisms</h4>
        <button onClick={() => { setActiveFilter('inside-out'); layoutRef.current(); }}>Inside-out</button>
        <button onClick={() => { setActiveFilter('outside-in'); layoutRef.current(); }}>Outside-in</button>
        <button onClick={() => { setActiveFilter(null); layoutRef.current(); }}>Reset</button>
        <div>
          <label>Ebene wählen:</label>
          <select value={focusId} onChange={(e) => setFocusId(e.target.value)}>
            <option value="1">🌳 Root (Governance Dimensions)</option>
            <option value="2">📁 Processes & Operations</option>
            <option value="3">📁 Structures</option>
            <option value="4">📁 Relational Mechanisms</option>
            <option value="5">📁 Autonomy</option>
            <option value="all">🌐 Gesamte Mindmap anzeigen</option>
          </select>
        </div>
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
        edgeType="straight"
      >
        <Controls />
        <Background />
      </ReactFlow>

      {popupContent && (
        <div className="mindmap-popup">
          <h2>{popupContent.title}</h2>
          <p>{popupContent.text}</p>
          <button onClick={closePopup}>Schließen</button>
        </div>
      )}
    </div>
  );
}
