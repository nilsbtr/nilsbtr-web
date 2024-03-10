const Colors = () => {
  return (
    <div className="mt-3 rounded-lg border-2 border-content/30 text-content">
      <div className="p-3">
        <p className="bg-background text-foreground p-3">
          --background / --foreground
        </p>
        <p className="bg-card text-card-foreground p-3">
          --card / --card-foreground
        </p>
        <p className="bg-popover text-popover-foreground p-3">
          --popover / --popover-foreground
        </p>
        <p className="bg-primary text-primary-foreground p-3">
          --primary / --primary-foreground
        </p>
        <p className="bg-secondary text-secondary-foreground p-3">
          --secondary / --secondary-foreground
        </p>
        <p className="bg-muted text-muted-foreground p-3">
          --muted / --muted-foreground
        </p>
        <p className="bg-accent text-accent-foreground p-3">
          --accent / --accent-foreground
        </p>
        <p className="bg-destructive text-destructive-foreground p-3">
          --destructive / --destructive-foreground
        </p>
        <p className="bg-border p-3">--border</p>
        <p className="bg-input p-3">--input</p>
        <p className="bg-ring p-3">--ring</p>
      </div>
    </div>
  );
};

export default Colors;
