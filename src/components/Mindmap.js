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
  //Mechanismen
  '6': 'Details zu Services & Resources...',
  '7': 'Details zum Structured Program...',
  '8': 'Hier stehen Informationen über Decision Processes...',
  '9': 'Beschreibung der verwendeten Metriken...',
  '10': 'Details zur Contracting Policy...',
  '11': 'Entity: Beteiligungsformen und rechtliche Struktur von Startups…',
  '12': 'Corporate Management: Beteiligung und Governance durch den Konzern…',
  '13': 'Program Management: Aufbau und Umsetzung der Innovationsprogramme…',
  '14': 'Location: Wo und wie die Startups räumlich verankert sind…',
  '15': 'Branding: Markenstrategie und Sichtbarkeit…',
  '16': 'Collaboration & Communication: Zusammenarbeit zwischen Konzern und Startup…',
  '17': 'Interplay & Networking: Netzwerke, Events und Partnerschaften…',
  '18': 'Values & Culture: Unternehmenskultur und kulturelle Passung…',
  '19': 'Roles: Aufgabenverteilung, Ansprechpartner und Teams…',

  //Auswahlmöglichkeiten
  '1001': 'Details zu Vollständige Integration',
  '1002': 'Details zu Selektiver Zugriff',
  '1003': 'Details zu Externe Unterstützung',
  '1004': 'Details zu Minimaler Support',
  '1005': 'Details zu Accelerator-Programme',
  '1006': 'Details zu Entrepreneurship-Programme',
  '1007': 'Details zu Inkubationsprogramme',
  '1008': 'Details zu Offene Programme',
  '1009': 'Details zu Gate-Prozess',
  '1010': 'Details zu Dezentrale Entscheidungen',
  '1011': 'Details zu Hybrid-Modelle',
  '1012': 'Details zu PoC-Entscheidungen',
  '1013': 'Details zu Erfolgsdefinition',
  '1014': 'Details zu Strikte Bedingungen',
  '1015': 'Details zu Flexible Prozesse',
  '1016': 'Details zu Separate Einheit',
  '1017': 'Details zu Regelungen durch Program Management',
  '1018': 'Details zu Eigentumsstruktur',
  '1019': 'Details zu Minderheitsbeteiligungen',
  '1020': 'Details zu 100%ige Tochtergesellschaft',
  '1021': 'Details zu Virtuelle Beteiligung',
  '1022': 'Details zu Spin-off',
  '1023': 'Details zu Joint Venture',
  '1024': 'Details zu Minderheitsbeteiligung mit Governance',
  '1025': 'Details zu Mehrheitsbeteiligung mit Unterstützung',
  '1026': 'Details zu Ausgründung mit Partnern',
  '1027': 'Details zu Interne Abordnungen',
  '1028': 'Details zu Eigenständige Einheit',
  '1029': 'Details zu Integration in Unternehmensbereiche',
  '1030': 'Details zu Netzwerkbasierte Unterstützung',
  '1031': 'Details zu PoC-Projekte',
  '1032': 'Details zu Standort im Mutterkonzern',
  '1033': 'Details zu Separater Standort',
  '1034': 'Details zu Ökosystem-Standort',
  '1035': 'Details zu Virtueller Standort',
  '1036': 'Details zu Corporate Branding',
  '1037': 'Details zu Eigenständiges Branding',
  '1038': 'Details zu Co-Branding',
  '1039': 'Details zu Flexibles Branding',
  '1040': 'Details zu Sub-Branding',
  '1041': 'Details zu Informeller Kooperationsstil',
  '1042': 'Details zu Klare Verantwortlichkeiten',
  '1043': 'Details zu Kollaborative Ansätze',
  '1044': 'Details zu Partnerschaften auf Augenhöhe',
  '1045': 'Details zu Scouting/Netzwerkausbau',
  '1046': 'Details zu Collaboration/Inkubation',
  '1047': 'Details zu Marketing',
  '1048': 'Details zu Ansprechpartner',
  '1049': 'Details zu Austausch',
  '1050': 'Details zu Interdisziplinäre Teams',
  '1051': 'Details zu Offene Kultur',
  '1052': 'Details zu Kulturtransfer',
  '1053': 'Details zu Übergang zu Ventures',
  '1054': 'Details zu Zusammenarbeit mit Kulturen'
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

    //Auswahlmöglichkeiten
    { "id": "1001", "label": "Vollständige Integration", "parentId": "6", "children": [] },
    { "id": "1002", "label": "Selektiver Zugriff", "parentId": "6", "children": [] },
    { "id": "1003", "label": "Externe Unterstützung", "parentId": "6", "children": [] },
    { "id": "1004", "label": "Minimaler Support", "parentId": "6", "children": [] },
    { "id": "1005", "label": "Accelerator-Programme", "parentId": "7", "children": [] },
    { "id": "1006", "label": "Entrepreneurship-Programme", "parentId": "7", "children": [] },
    { "id": "1007", "label": "Inkubationsprogramme", "parentId": "7", "children": [] },
    { "id": "1008", "label": "Offene Programme", "parentId": "7", "children": [] },
    { "id": "1009", "label": "Gate-Prozess", "parentId": "8", "children": [] },
    { "id": "1010", "label": "Dezentrale Entscheidungen", "parentId": "8", "children": [] },
    { "id": "1011", "label": "Hybrid-Modelle", "parentId": "8", "children": [] },
    { "id": "1012", "label": "PoC-Entscheidungen", "parentId": "8", "children": [] },
    { "id": "1013", "label": "Erfolgsdefinition", "parentId": "9", "children": [] },
    { "id": "1014", "label": "Strikte Bedingungen", "parentId": "10", "children": [] },
    { "id": "1015", "label": "Flexible Prozesse", "parentId": "10", "children": [] },
    { "id": "1016", "label": "Separate Einheit", "parentId": "10", "children": [] },
    { "id": "1017", "label": "Regelungen durch Program Management", "parentId": "10", "children": [] },
    { "id": "1018", "label": "Eigentumsstruktur", "parentId": "10", "children": [] },
    { "id": "1019", "label": "Minderheitsbeteiligungen", "parentId": "11", "children": [] },
    { "id": "1020", "label": "100%ige Tochtergesellschaft", "parentId": "11", "children": [] },
    { "id": "1021", "label": "Virtuelle Beteiligung", "parentId": "11", "children": [] },
    { "id": "1022", "label": "Spin-off", "parentId": "11", "children": [] },
    { "id": "1023", "label": "Joint Venture", "parentId": "11", "children": [] },
    { "id": "1024", "label": "Minderheitsbeteiligung mit Governance", "parentId": "12", "children": [] },
    { "id": "1025", "label": "Mehrheitsbeteiligung mit Unterstützung", "parentId": "12", "children": [] },
    { "id": "1026", "label": "Ausgründung mit Partnern", "parentId": "12", "children": [] },
    { "id": "1027", "label": "Interne Abordnungen", "parentId": "12", "children": [] },
    { "id": "1028", "label": "Eigenständige Einheit", "parentId": "13", "children": [] },
    { "id": "1029", "label": "Integration in Unternehmensbereiche", "parentId": "13", "children": [] },
    { "id": "1030", "label": "Netzwerkbasierte Unterstützung", "parentId": "13", "children": [] },
    { "id": "1031", "label": "PoC-Projekte", "parentId": "13", "children": [] },
    { "id": "1032", "label": "Standort im Mutterkonzern", "parentId": "14", "children": [] },
    { "id": "1033", "label": "Separater Standort", "parentId": "14", "children": [] },
    { "id": "1034", "label": "Ökosystem-Standort", "parentId": "14", "children": [] },
    { "id": "1035", "label": "Virtueller Standort", "parentId": "14", "children": [] },
    { "id": "1036", "label": "Corporate Branding", "parentId": "15", "children": [] },
    { "id": "1037", "label": "Eigenständiges Branding", "parentId": "15", "children": [] },
    { "id": "1038", "label": "Co-Branding", "parentId": "15", "children": [] },
    { "id": "1039", "label": "Flexibles Branding", "parentId": "15", "children": [] },
    { "id": "1040", "label": "Sub-Branding", "parentId": "15", "children": [] },
    { "id": "1041", "label": "Informeller Kooperationsstil", "parentId": "16", "children": [] },
    { "id": "1042", "label": "Klare Verantwortlichkeiten", "parentId": "16", "children": [] },
    { "id": "1043", "label": "Kollaborative Ansätze", "parentId": "16", "children": [] },
    { "id": "1044", "label": "Partnerschaften auf Augenhöhe", "parentId": "16", "children": [] },
    { "id": "1045", "label": "Scouting/Netzwerkausbau", "parentId": "17", "children": [] },
    { "id": "1046", "label": "Collaboration/Inkubation", "parentId": "17", "children": [] },
    { "id": "1047", "label": "Marketing", "parentId": "17", "children": [] },
    { "id": "1048", "label": "Ansprechpartner", "parentId": "18", "children": [] },
    { "id": "1049", "label": "Austausch", "parentId": "18", "children": [] },
    { "id": "1050", "label": "Interdisziplinäre Teams", "parentId": "18", "children": [] },
    { "id": "1051", "label": "Offene Kultur", "parentId": "19", "children": [] },
    { "id": "1052", "label": "Kulturtransfer", "parentId": "19", "children": [] },
    { "id": "1053", "label": "Übergang zu Ventures", "parentId": "19", "children": [] },
    { "id": "1054", "label": "Zusammenarbeit mit Kulturen", "parentId": "19", "children": [] }
  ],
  parentMap: {
    '2': '1', '3': '1', '4': '1', '5': '1',
    '6': '2', '7': '2', '8': '2', '9': '2', '10': '2',
    '11': '3', '12': '3', '13': '3', '14': '3', '15': '3',
    '16': '4', '17': '4', '18': '4', '19': '4',

    '1001': '6',
    '1002': '6',
    '1003': '6',
    '1004': '6',

    '1005': '7',
    '1006': '7',
    '1007': '7',
    '1008': '7',

    '1009': '8',
    '1010': '8',
    '1011': '8',
    '1012': '8',

    '1013': '9',

    '1014': '10',
    '1015': '10',
    '1016': '10',
    '1017': '10',
    '1018': '10',

    '1019': '11',
    '1020': '11',
    '1021': '11',
    '1022': '11',
    '1023': '11',

    '1024': '12',
    '1025': '12',
    '1026': '12',
    '1027': '12',

    '1028': '13',
    '1029': '13',
    '1030': '13',
    '1031': '13',

    '1032': '14',
    '1033': '14',
    '1034': '14',
    '1035': '14',

    '1036': '15',
    '1037': '15',
    '1038': '15',
    '1039': '15',
    '1040': '15',

    '1041': '16',
    '1042': '16',
    '1043': '16',
    '1044': '16',

    '1045': '17',
    '1046': '17',
    '1047': '17',

    '1048': '18',
    '1049': '18',
    '1050': '18',

    '1051': '19',
    '1052': '19',
    '1053': '19',
    '1054': '19',
  },
};

const center = { x: 800, y: 400 };
//const mainDimensionIds = ['2', '3', '4', '5'];
/*const dummyAssignment = {
  '6': 'inside-out', '7': 'inside-out', '8': 'outside-in', '9': 'outside-in', '10': 'inside-out',
  '11': 'outside-in', '12': 'inside-out', '13': 'outside-in', '14': 'inside-out', '15': 'outside-in',
  '16': 'inside-out', '17': 'outside-in', '18': 'inside-out', '19': 'outside-in',
}; wegen Filter */ 

export default function Mindmap() {
  const [focusId, setFocusId] = useState('1');
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [popupContent, setPopupContent] = useState(null);
  //const [activeFilter, setActiveFilter] = useState(null); wegen Filter
  const [expandedMechanisms, setExpandedMechanisms] = useState([]);
  const layoutRef = useRef(() => {});

  const renderPossibilities = useCallback((allNodes, edgesList) => {
    expandedMechanisms.forEach((mechanismId) => {
      const parentNode = allNodes.get(mechanismId);
      if (!parentNode) return;

      const options = rawData.nodes.filter((n) => n.parentId === mechanismId);
      const spacingY = 40;
      const startY = parentNode.position.y - ((options.length - 1) * spacingY) / 2;

      const isLeft = parentNode.position.x < center.x;
      const xOffset = isLeft ? -250 : 250;

      options.forEach((opt, i) => {
        const x = parentNode.position.x + xOffset;
        const y = startY + i * spacingY;

        allNodes.set(opt.id, {
          id: opt.id,
          data: { label: opt.label },
          position: { x, y },
          draggable: false,
          connectable: false,
          style: {
            backgroundColor: '#fef3c7',
            border: '1px solid #eab308',
            borderRadius: '6px',
            fontSize: 12,
            padding: '6px',
            textAlign: isLeft ? 'right' : 'left',
          }
        });

        edgesList.push({
          id: `e${mechanismId}-${opt.id}`,
          source: mechanismId,
          target: opt.id,
        });
      });
    });
  }, [expandedMechanisms]);

  const layout = useCallback(() => {
    const baseRadius = 150;
    const allNodes = new Map();
    const edgesList = [];

    const buildCircularLayout = (nodeId, level = 0, angleStart = 0, angleEnd = 2 * Math.PI) => {
      const children = rawData.nodes.find(n => n.id === nodeId)?.children || [];
      const radius = baseRadius + level * 180;
      const angleStep = (angleEnd - angleStart) / Math.max(children.length, 1);

      const nodeData = rawData.nodes.find(n => n.id === nodeId);
      //const isMain = mainDimensionIds.includes(nodeId);
      //const isHighlighted = nodeId === '1' || !activeFilter || isMain || dummyAssignment[nodeId] === activeFilter; Wegen Filter
      const isHighlighted = true;

      allNodes.set(nodeId, {
        id: nodeId,
        data: { label: nodeData?.label || nodeId },
        position: level === 0
          ? center
          : {
              x: center.x + radius * Math.cos((angleStart + angleEnd) / 2),
              y: center.y + radius * Math.sin((angleStart + angleEnd) / 2),
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

    if (focusId === 'all') {
      buildCircularLayout('1');
      renderPossibilities(allNodes, edgesList);
      setNodes(Array.from(allNodes.values()));
      setEdges(edgesList);
      return;
    }

    // Möglichkeit in beiden Fällen rendern:
    buildCircularLayout(focusId);
    renderPossibilities(allNodes, edgesList);
    setNodes(Array.from(allNodes.values()));
setEdges(edgesList);

    /*// Ansicht für einzelne Ebene (z.B. focusId = "2" o.ä.)
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

    // Für Teilansicht → neu einfügen:
    buildCircularLayout(focusId); 
    expandedMechanisms.forEach((mechanismId) => {
      const parentNode = allNodes.get(mechanismId);
      if (!parentNode) return;

      const options = rawData.nodes.filter((n) => n.parentId === mechanismId);
      const spacingY = 40;
      const startY = parentNode.position.y - ((options.length - 1) * spacingY) / 2;

      const isLeft = parentNode.position.x < center.x;
      const xOffset = isLeft ? -250 : 250;

      options.forEach((opt, i) => {
        const x = parentNode.position.x + xOffset;
        const y = startY + i * spacingY;

        allNodes.set(opt.id, {
          id: opt.id,
          data: { label: opt.label },
          position: { x, y },
          draggable: false,
          connectable: false,
          style: {
            backgroundColor: '#fef3c7',
            border: '1px solid #eab308',
            borderRadius: '6px',
            fontSize: 12,
            padding: '6px',
            textAlign: isLeft ? 'right' : 'left',
          }
        });

        edgesList.push({
          id: `e${mechanismId}-${opt.id}`,
          source: mechanismId,
          target: opt.id,
        });
      });
    }); 

    const newEdges = children.map((child) => ({
      id: `e${focusNode.id}-${child.id}`,
      source: focusNode.id,
      target: child.id,
    }));

    setNodes(newNodes);
    setEdges(newEdges);*/
    return;
  }, [focusId, setNodes, setEdges, renderPossibilities]);

  layoutRef.current = layout;

  useEffect(() => {
    layout();
  }, [focusId, layout]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onNodeClick = (event, node) => {
    const nodeData = rawData.nodes.find((n) => n.id === node.id);
    //const isMain = mainDimensionIds.includes(node.id);
    const isLeaf = !nodeData?.children?.length;
    //const isHighlighted = !activeFilter || isMain || dummyAssignment[node.id] === activeFilter; wegen Filter
    const isHighlighted = true;

    if (!isHighlighted) return; // blockiere Klicks auf ausgegraute Nodes

    if (focusId === 'all') {
      if (isLeaf) {
        const content = nodeDetails[node.id] || 'Keine weiteren Informationen verfügbar.';
        setPopupContent({ id: node.id, title: nodeData.label, text: content });
      } else {
        // Wenn Mechanismus, aber keine Kinder → trotzdem Popup mit Button
        const content = nodeDetails[node.id] || 'Keine weiteren Informationen verfügbar.';
        setPopupContent({ id: node.id, title: nodeData.label, text: content });
      }
      return;
    }

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
      setPopupContent({ id: node.id, title: fullNode.label, text: content });
    }
  };

  const closePopup = () => setPopupContent(null);

  return (
    <div style={{ height: '80vh', width: '100%', position: 'relative' }}>
      <div className="mindmap-controls">
        {/*
        <h4>Filter Mechanisms:</h4>
        <button onClick={() => { setActiveFilter('inside-out'); layoutRef.current(); }}>Inside-out</button>
        <button onClick={() => { setActiveFilter('outside-in'); layoutRef.current(); }}>Outside-in</button>
        <button onClick={() => { setActiveFilter(null); layoutRef.current(); }}>Reset</button>
        wegen Filter*/}
        <div>
          <h4>Ebene wählen:</h4>
          <select value={focusId} onChange={(e) => setFocusId(e.target.value)}>
            <option value="all">🌐 Gesamte Mindmap anzeigen</option>
            <option value="2">📁 Processes & Operations</option>
            <option value="3">📁 Structures</option>
            <option value="4">📁 Relational Mechanisms</option>
            <option value="5">📁 Autonomy</option>
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

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px' }}>
        {popupContent.id &&
          rawData.nodes.some((n) => n.parentId === popupContent.id) && (
            <button
              onClick={() => {
                setExpandedMechanisms((prev) =>
                  prev.includes(popupContent.id)
                    ? prev.filter((id) => id !== popupContent.id)
                    : [...prev, popupContent.id]
                );
                closePopup();
              }}
            >
              {expandedMechanisms.includes(popupContent.id)
                ? 'Hide Possibilities'
                : 'Show Possibilities'}
            </button>
          )}

        <button onClick={closePopup}>Schließen</button>
      </div>
    </div>
  )}
    </div>
  );
}
