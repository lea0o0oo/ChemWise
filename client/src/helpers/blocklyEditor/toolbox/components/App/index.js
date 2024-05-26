export default `<category name="App" colour="#652b87">
<block type="app_data_get_screen" />
<block type="percentage_screen">
<field name="axis">width</field>
<value name="percentage">
  <shadow type="math_number">
    <field name="NUM">50</field>
  </shadow>
</value>
</block>
<block type="app_set_bg">
  <value name="color">
    <block type="colour_picker">
      <field name="COLOUR">#33ccff</field>
    </block>
  </value>
</block>
</category>`;
