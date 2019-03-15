// Given an allOfSchema components
// When given a single schema it
  // It should pass it to a generic schema component

  // When the schema has a width
    // It should render the generic-schema inside a column

  // When given a model
    // It should pass it to a generic schema component
  // When given error messages
    // It should pass it to a generic schema component
  // When given a locale
    // It should pass it to a generic schema component
  // When given translations
    // It should pass them to a generic schema component

  // When the generic schema triggers an onchange event
    // It should propogate the event to consumers
    // It combinate the changed model with the internal model

  // When the generic schema triggers onRefreshRequirements
    // It should propogate that event to consumers
    // It combinate the changed model with the internal model

// When given multiple schemas
  // It should render a generic-schema for each
