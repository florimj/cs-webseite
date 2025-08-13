import React, { useState } from 'react';

function StrategyDecisionTree() {
  // Beispiel-Fragenstruktur: Später durch richtige Inhalte ersetzen
  const questions = [
    {
      id: 1,
      question: "What is your main strategic goal?",
      options: [
        { text: "Speed & Agility", value: "agility" },
        { text: "Risk Control", value: "control" },
        { text: "Market Expansion", value: "expansion" }
      ]
    },
    {
      id: 2,
      question: "How autonomous should your startup initiative be?",
      options: [
        { text: "Fully Independent", value: "independent" },
        { text: "Partially Integrated", value: "hybrid" },
        { text: "Fully Embedded", value: "embedded" }
      ]
    },
    {
      id: 3,
      question: "What internal resources are available?",
      options: [
        { text: "Dedicated Team & Budget", value: "dedicated" },
        { text: "Shared with Core Business", value: "shared" },
        { text: "Minimal", value: "minimal" }
      ]
    },
    {
      id: 4,
      question: "Which startup maturity level do you prefer to engage with?",
      options: [
        { text: "Early-Stage Startups", value: "early" },
        { text: "Growth Startups", value: "growth" },
        { text: "Any Stage", value: "any" }
      ]
    }
  ];

  const [currentStep, setCurrentStep] = useState(-1); // -1 = Startseite
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const handleSubmit = () => {
    const key = answers.join("-");

    // Beispielhafte einfache Entscheidungsmatrix
    let recommendation = "Based on your choices, we recommend an Outside-In approach with selective autonomy.";

    if (answers.includes("control") && answers.includes("embedded")) {
      recommendation = "We recommend a fully integrated Inside-Out model with strong corporate control.";
    } else if (answers.includes("agility") && answers.includes("independent")) {
      recommendation = "We recommend a spin-off or venture client model to maximize agility.";
    }

    setResult(recommendation);
  };

  const handleAnswer = (value) => {
    setAnswers((prev) => [...prev, value]);
    const nextStep = currentStep + 1;
    if (nextStep < questions.length) {
      setCurrentStep(nextStep);
    } else {
      handleSubmit();
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
      <h2 style={{ marginBottom: '1rem' }}>Strategy Decision Tree</h2>

      {/* Einführender Text auf Startseite */}
      {currentStep === -1 && (
        <div style={{ marginBottom: '2rem' }}>
          <p>
            Welcome to the Strategy Decision Tree. This tool helps you explore which corporate startup governance approach might best suit your strategic goals.
          </p>
          <p>
            You will be guided through four short questions, each focusing on different strategic factors such as autonomy, resource availability or market orientation. Based on your answers, you’ll receive a final recommendation with a matching governance model or approach.
          </p>
          <p>
            You can use this as a reflective tool to explore potential directions or as a starting point for discussion within your organization.
          </p>
          <button
            onClick={() => setCurrentStep(0)}
            style={{ padding: '0.8rem 1.5rem', fontSize: '1rem', borderRadius: '6px', backgroundColor: '#eab308', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Start Now
          </button>
        </div>
      )}

      {/* Fragenanzeige */}
      {result === null && currentStep >= 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h4>Question {currentStep + 1} of {questions.length}</h4>
          <p style={{ fontSize: '1.2rem' }}>{questions[currentStep].question}</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {questions[currentStep].options.map((option, index) => (
              <li key={index} style={{ marginTop: '0.5rem' }}>
                <button
                  onClick={() => handleAnswer(option.value)}
                  style={{ padding: '0.6rem 1rem', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ccc', cursor: 'pointer' }}
                >
                  {option.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Ergebnis anzeigen */}
      {result && (
        <div style={{ backgroundColor: '#f4f4f4', padding: '1.5rem', borderRadius: '8px', marginTop: '1rem' }}>
          <h3>Recommendation</h3>
          <p>{result}</p>
          {/* Optional: Link zu passender Modellseite */}
        </div>
      )}
    </div>
  );
}

export default StrategyDecisionTree;
