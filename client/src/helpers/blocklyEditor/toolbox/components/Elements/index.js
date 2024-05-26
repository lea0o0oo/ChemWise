export default `<category name="Elements" colour="#104f9c">
<label text="Data" />
<block type="sprite_get_dimentions" />
<block type="sprite_get_pos" />
<label text="Actions" />
<block type="sprite_set_texture" />
<block type="sprite_anchor_set">
  <field name="spriteVar">character</field>
  <value name="anchor">
    <shadow type="math_number">
      <field name="NUM">0.5</field>
    </shadow>
  </value>
</block>
<block type="sprite_set_position">
<field name="selSprite">character</field>
<field name="axis">x</field>
<value name="value">
  <shadow type="math_number">
    <field name="NUM">0</field>
  </shadow>
</value>
</block>
<block type="sprite_set_scale">
<field name="axis">x</field>
<field name="spriteVar">character</field>
<value name="scale">
  <shadow type="math_number">
    <field name="NUM">0</field>
  </shadow>
</value>
</block>
<block type="sprite_set_dimentions">
  <field name="sprite">character</field>
  <field name="idk">width</field>
  <value name="value">
    <shadow type="math_number">
      <field name="NUM">32</field>
    </shadow>
  </value>
</block>
<block type="set_visibility" />
<block type="set_z_index">
<field name="varName">character</field>
<value name="zValue">
  <shadow type="math_number">
    <field name="NUM">1</field>
  </shadow>
</value>
</block>
<block type="slide_sprite_easy">
<field name="spriteVar">character</field>
<field name="timeFormat">seconds</field>
<value name="x">
  <shadow type="math_number">
    <field name="NUM">0</field>
  </shadow>
</value>
<value name="y">
  <shadow type="math_number">
    <field name="NUM">0</field>
  </shadow>
</value>
<value name="time">
  <shadow type="math_number">
    <field name="NUM">1</field>
  </shadow>
</value>
</block>
<block type="slide_sprite">
<field name="spriteVar">character</field>
<field name="timeFormat">seconds</field>
<value name="initX">
  <shadow type="math_number">
    <field name="NUM">0</field>
  </shadow>
</value>
<value name="initY">
  <shadow type="math_number">
    <field name="NUM">0</field>
  </shadow>
</value>
<value name="finalX">
  <shadow type="math_number">
    <field name="NUM">100</field>
  </shadow>
</value>
<value name="finalY">
  <shadow type="math_number">
    <field name="NUM">100</field>
  </shadow>
</value>
<value name="time">
  <shadow type="math_number">
    <field name="NUM">1</field>
  </shadow>
</value>
</block>
<block type="sprite_skew_set">
<field name="elemVar">character</field>
<field name="axis">x</field>
<value name="value">
  <shadow type="math_number">
    <field name="NUM">1</field>
  </shadow>
</value>
</block>
</category>`;
