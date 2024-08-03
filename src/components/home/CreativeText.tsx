import React from "react";

type CreativeTextProps = {
  animationStyle: 2;
};

const CreativeText: React.FC<CreativeTextProps> = ({ animationStyle }) => {
  const getClassName = () => {
    switch (animationStyle) {
      default:
        return "creative__text--animation-2";
    }
  };

  return (
    <div className={getClassName()}>
      I&apos;m
      <span
        style={{ "--i": 1 } as React.CSSProperties}
        data-text="Saad Qadeer."
      >
        Saad Qadeer.
      </span>
      <span style={{ "--i": 2 } as React.CSSProperties} data-text="Creator.">
        Creator.
      </span>
      <span style={{ "--i": 3 } as React.CSSProperties} data-text="Animator.">
        Animator.
      </span>
      <span style={{ "--i": 4 } as React.CSSProperties} data-text="Designer.">
        Designer.
      </span>
    </div>
  );
};

export default CreativeText;
