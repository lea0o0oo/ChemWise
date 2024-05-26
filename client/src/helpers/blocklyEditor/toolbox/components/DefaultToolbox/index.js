export default `<category kind="search" colour="black" />
<sep />
<category name="Logic" colour="#5b80a5">
<block type="controls_if"/>
<block type="logic_compare">
  <field name="OP">EQ</field>
</block>
<block type="logic_operation">
  <field name="OP">AND</field>
</block>
<block type="logic_negate"/>
<block type="logic_boolean">
  <field name="BOOL">TRUE</field>
</block>
<block type="logic_null"/>
<block type="logic_nan" />
<block type="logic_ternary"/>
</category>
<category name="Loops" colour="#5ba55b">
<block type="controls_repeat_ext">
  <value name="TIMES">
    <shadow type="math_number">
      <field name="NUM">10</field>
    </shadow>
  </value>
</block>
<block type="controls_whileUntil">
  <field name="MODE">WHILE</field>
</block>
<block type="controls_for">
  <field name="VAR" id="q_qi$!zdP*y$RMqjlm~8">i</field>
  <value name="FROM">
    <shadow type="math_number">
      <field name="NUM">1</field>
    </shadow>
  </value>
  <value name="TO">
    <shadow type="math_number">
      <field name="NUM">10</field>
    </shadow>
  </value>
  <value name="BY">
    <shadow type="math_number">
      <field name="NUM">1</field>
    </shadow>
  </value>
</block>
<block type="controls_forEach">
  <field name="VAR" id="Mn8tpns-^h2.qOC9e3ge">j</field>
</block>
<block type="controls_flow_statements">
  <field name="FLOW">BREAK</field>
</block>
</category>
<category name="Math" colour="#5b67a5">
<block type="math_number">
  <field name="NUM">0</field>
</block>
<block type="math_arithmetic">
  <field name="OP">ADD</field>
  <value name="A">
    <shadow type="math_number">
      <field name="NUM">1</field>
    </shadow>
  </value>
  <value name="B">
    <shadow type="math_number">
      <field name="NUM">1</field>
    </shadow>
  </value>
</block>
<block type="number_convert" />
<block type="math_single">
  <field name="OP">ROOT</field>
  <value name="NUM">
    <shadow type="math_number">
      <field name="NUM">9</field>
    </shadow>
  </value>
</block>
<block type="math_trig">
  <field name="OP">SIN</field>
  <value name="NUM">
    <shadow type="math_number">
      <field name="NUM">45</field>
    </shadow>
  </value>
</block>
<block type="math_constant">
  <field name="CONSTANT">PI</field>
</block>
<block type="math_number_property">
  <mutation divisor_input="false"/>
  <field name="PROPERTY">EVEN</field>
  <value name="NUMBER_TO_CHECK">
    <shadow type="math_number">
      <field name="NUM">0</field>
    </shadow>
  </value>
</block>
<block type="math_round">
  <field name="OP">ROUND</field>
  <value name="NUM">
    <shadow type="math_number">
      <field name="NUM">3.1</field>
    </shadow>
  </value>
</block>
<block type="math_on_list">
  <mutation op="SUM"/>
  <field name="OP">SUM</field>
</block>
<block type="math_modulo">
  <value name="DIVIDEND">
    <shadow type="math_number">
      <field name="NUM">64</field>
    </shadow>
  </value>
  <value name="DIVISOR">
    <shadow type="math_number">
      <field name="NUM">10</field>
    </shadow>
  </value>
</block>
<block type="math_constrain">
  <value name="VALUE">
    <shadow type="math_number">
      <field name="NUM">50</field>
    </shadow>
  </value>
  <value name="LOW">
    <shadow type="math_number">
      <field name="NUM">1</field>
    </shadow>
  </value>
  <value name="HIGH">
    <shadow type="math_number">
      <field name="NUM">100</field>
    </shadow>
  </value>
</block>
<block type="math_random_int">
  <value name="FROM">
    <shadow type="math_number">
      <field name="NUM">1</field>
    </shadow>
  </value>
  <value name="TO">
    <shadow type="math_number">
      <field name="NUM">100</field>
    </shadow>
  </value>
</block>
<block type="math_random_float"/>
</category>
<category name="Text" colour="#5ba58c">
<block type="text">
  <field name="TEXT"/>
</block>
<block type="text_multiline" />
<block type="text_join">
  <mutation items="2"/>
</block>
<block type="string_convert" />
<block type="text_append">
  <field name="VAR" id="Rb1},~A7oHL@PL7IUSj!">item</field>
  <value name="TEXT">
    <shadow type="text">
      <field name="TEXT"/>
    </shadow>
  </value>
</block>
<block type="text_length">
  <value name="VALUE">
    <shadow type="text">
      <field name="TEXT">abc</field>
    </shadow>
  </value>
</block>
<block type="text_isEmpty">
  <value name="VALUE">
    <shadow type="text">
      <field name="TEXT"/>
    </shadow>
  </value>
</block>
<block type="text_indexOf">
  <field name="END">FIRST</field>
  <value name="VALUE">
    <block type="variables_get">
      <field name="VAR" id="1t)cDOKnBgt2E~4s/3Hy">text</field>
    </block>
  </value>
  <value name="FIND">
    <shadow type="text">
      <field name="TEXT">abc</field>
    </shadow>
  </value>
</block>
<block type="text_charAt">
  <mutation at="true"/>
  <field name="WHERE">FROM_START</field>
  <value name="VALUE">
    <block type="variables_get">
      <field name="VAR" id="1t)cDOKnBgt2E~4s/3Hy">text</field>
    </block>
  </value>
</block>
<block type="text_getSubstring">
  <mutation at1="true" at2="true"/>
  <field name="WHERE1">FROM_START</field>
  <field name="WHERE2">FROM_START</field>
  <value name="STRING">
    <block type="variables_get">
      <field name="VAR" id="1t)cDOKnBgt2E~4s/3Hy">text</field>
    </block>
  </value>
</block>
<block type="text_changeCase">
  <field name="CASE">UPPERCASE</field>
  <value name="TEXT">
    <shadow type="text">
      <field name="TEXT">abc</field>
    </shadow>
  </value>
</block>
<block type="text_trim">
  <field name="MODE">BOTH</field>
  <value name="TEXT">
    <shadow type="text">
      <field name="TEXT">abc</field>
    </shadow>
  </value>
</block>
</category>
<category name="Lists" colour="#745ba5">
<block type="lists_create_with">
  <mutation items="0"/>
</block>
<block type="lists_create_with">
  <mutation items="3"/>
</block>
<block type="lists_repeat">
  <value name="NUM">
    <shadow type="math_number">
      <field name="NUM">5</field>
    </shadow>
  </value>
</block>
<block type="lists_length"/>
<block type="lists_isEmpty"/>
<block type="lists_indexOf">
  <field name="END">FIRST</field>
  <value name="VALUE">
    <block type="variables_get">
      <field name="VAR" id="4+:qmU6COz|Z5JKbk-b$">list</field>
    </block>
  </value>
</block>
<block type="lists_getIndex">
  <mutation statement="false" at="true"/>
  <field name="MODE">GET</field>
  <field name="WHERE">FROM_START</field>
  <value name="VALUE">
    <block type="variables_get">
      <field name="VAR" id="4+:qmU6COz|Z5JKbk-b$">list</field>
    </block>
  </value>
</block>
<block type="lists_setIndex">
  <mutation at="true"/>
  <field name="MODE">SET</field>
  <field name="WHERE">FROM_START</field>
  <value name="LIST">
    <block type="variables_get">
      <field name="VAR" id="4+:qmU6COz|Z5JKbk-b$">list</field>
    </block>
  </value>
</block>
<block type="lists_getSublist">
  <mutation at1="true" at2="true"/>
  <field name="WHERE1">FROM_START</field>
  <field name="WHERE2">FROM_START</field>
  <value name="LIST">
    <block type="variables_get">
      <field name="VAR" id="4+:qmU6COz|Z5JKbk-b$">list</field>
    </block>
  </value>
</block>
<block type="lists_split">
  <mutation mode="SPLIT"/>
  <field name="MODE">SPLIT</field>
  <value name="DELIM">
    <shadow type="text">
      <field name="TEXT">,</field>
    </shadow>
  </value>
</block>
<block type="lists_sort">
  <field name="TYPE">NUMERIC</field>
  <field name="DIRECTION">1</field>
</block>
<block type="lists_reverse" />
</category>
<category name="Objects" colour="#5d3fd3">
<label text='> Make a new object' />
<block type="object_new_empty"></block>
<label text='⚠️ These two blocks must be used together!' />
<block type="object_new_container">
  <statement name="values">
    <block type="object_new_value">
      <value name="key">
        <shadow type="text">
          <field name="TEXT">key</field>
        </shadow>
      </value>
      <value name="value">
        <shadow type="text">
          <field name="TEXT">value</field>
        </shadow>
      </value>
    </block>
  </statement>
</block>
<block type="object_new_value">
  <value name="key">
    <shadow type="text">
      <field name="TEXT">key</field>
    </shadow>
  </value>
  <value name="value">
    <shadow type="text">
      <field name="TEXT">value</field>
    </shadow>
  </value>
</block>
<label text='> Manage' />
<block type="object_get">
  <value name="object">
    <block type="variables_get">
      <field name="VAR">object</field>
    </block>
  </value>
  <value name="key">
    <shadow type="text">
      <field name="TEXT">key</field>
    </shadow>
  </value>
</block>
<block type="object_set">
  <value name="object">
    <block type="variables_get">
      <field name="VAR">object</field>
    </block>
  </value>
  <value name="key">
    <shadow type="text">
      <field name="TEXT">key</field>
    </shadow>
  </value>
  <value name="value">
    <shadow type="text">
      <field name="TEXT">value</field>
    </shadow>
  </value>
</block>
<block type="object_has">
  <value name="object">
    <block type="variables_get">
      <field name="VAR">object</field>
    </block>
  </value>
  <value name="key">
    <shadow type="text">
      <field name="TEXT">key</field>
    </shadow>
  </value>
</block>
<block type="object_delete">
  <value name="object">
    <block type="variables_get">
      <field name="VAR">object</field>
    </block>
  </value>
  <value name="key">
    <shadow type="text">
      <field name="TEXT">key</field>
    </shadow>
  </value>
</block>
<block type="object_getkeys">
  <value name="object">
    <block type="variables_get">
      <field name="VAR">object</field>
    </block>
  </value>
</block>
<label text='> Advanced' />
<block type="object_parse">
  <value name="string">
    <shadow type="text">
      <field name="TEXT">{"key": "value"}</field>
    </shadow>
  </value>
</block>
<block type="object_stringify">
  <value name="object">
    <block type="variables_get">
      <field name="VAR">object</field>
    </block>
  </value>
</block>
</category>
<category name="Colour" colour="#a5745b">
<block type="colour_picker">
  <field name="COLOUR">#ff0000</field>
</block>
<block type="colour_random"/>
<block type="colour_rgb">
  <value name="RED">
    <shadow type="math_number">
      <field name="NUM">100</field>
    </shadow>
  </value>
  <value name="GREEN">
    <shadow type="math_number">
      <field name="NUM">50</field>
    </shadow>
  </value>
  <value name="BLUE">
    <shadow type="math_number">
      <field name="NUM">0</field>
    </shadow>
  </value>
</block>
<block type="colour_blend">
  <value name="COLOUR1">
    <shadow type="colour_picker">
      <field name="COLOUR">#ff0000</field>
    </shadow>
  </value>
  <value name="COLOUR2">
    <shadow type="colour_picker">
      <field name="COLOUR">#3333ff</field>
    </shadow>
  </value>
  <value name="RATIO">
    <shadow type="math_number">
      <field name="NUM">0.5</field>
    </shadow>
  </value>
</block>
</category>
<sep/>
<category name="Other" colour="#8f067a">
<block type="delay">
  <field name="format">seconds</field>
  <value name="time">
    <shadow type="math_number">
      <field name="NUM">5</field>
    </shadow>
  </value>
</block>
<block type="force" />
<block type="typeof_bol">
  <field name="types">string</field>
</block>
<block type="try_catch">
  <value name="errorVar">
    <block type="variables_get">
      <field name="VAR" id="mYY-a+56c~!s[V{BBCB7">error</field>
    </block>
  </value>
</block>
<block type="try_catch_finally">
  <value name="errorVar">
    <block type="variables_get">
      <field name="VAR" id="mYY-a+56c~!s[V{BBCB7">error</field>
    </block>
  </value>
</block>
</category>
<category name="Variables" colour="#a55b80" custom="VARIABLE"/>
<category name="Functions" colour="#995ba5" custom="PROCEDURE"/>`;
