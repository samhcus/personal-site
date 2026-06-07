export function LocationCard() {
  return (
    <span className="lc-wrapper">
      <span className="lc-trigger text-xs text-muted-foreground hover:text-foreground transition-colors cursor-default">
        Seattle, WA
      </span>
      <span className="lc-ref">
        <div className="lc-card">
          <div className="lc-inner-card">
            <div className="lc-bg-map" />
            <div className="lc-clouds">
              <div className="lc-cloud" />
              <div className="lc-cloud" />
              <div className="lc-cloud" />
              <div className="lc-cloud" />
            </div>
            <div className="lc-location" />
            <div className="lc-elements">
              <div className="lc-details" />
              <div className="lc-description">
                <div className="lc-main-title">Seattle</div>
                <div className="lc-second-title">Washington, USA</div>
              </div>
            </div>
          </div>
        </div>
      </span>
    </span>
  );
}
