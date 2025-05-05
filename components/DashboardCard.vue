<template>
    <div :class="['dashboard-card', { highlight }]">
      <div class="card-icon">
        <Icon :name="icon" size="24" />
      </div>
      <div class="card-content">
        <h3>{{ title }}</h3>
        <p>{{ value }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: String,
      value: [String, Number],
      icon: String,
      highlight: Boolean
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .dashboard-card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    display: flex;
    gap: 1rem;
    align-items: center;
    
    &.highlight {
      border-left: 4px solid #4299e1;
      background: linear-gradient(to right, #f8fafc, #ffffff);
    }
  
    .card-icon {
      background: #ebf8ff;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #4299e1;
    }
  
    .card-content {
      h3 {
        font-size: 0.875rem;
        color: #718096;
        margin: 0 0 0.25rem 0;
      }
      
      p {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0;
        color: #2d3748;
      }
    }
  }
  </style>