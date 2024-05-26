export default `<category name="Base" colour="#148563">
  <block type="console_log_uo">
    <value name="data">
      <shadow type="text">
        <field name="TEXT">Hello world!</field>
      </shadow>
    </value>
  </block>
  <block type="text_prompt_ext">
    <mutation type="TEXT"/>
    <field name="TYPE">TEXT</field>
    <value name="TEXT">
      <shadow type="text">
        <field name="TEXT">abc</field>
      </shadow>
    </value>
  </block>
  <label text="Infos about current player" />
  <block type="usertheme_get" />
  <label text="Intervals" />
  <block type="set_interval">
    <field name="interName">interval</field>
    <field name="format">ms</field>
    <value name="timeout">
      <shadow type="math_number">
        <field name="NUM">500</field>
      </shadow>
    </value>
  </block>
  <block type="set_interval_inline">
    <field name="interName">interval</field>
    <field name="format">ms</field>
    <value name="timeout">
      <shadow type="math_number">
        <field name="NUM">500</field>
      </shadow>
    </value>
  </block>
  <block type="clearinterval" />
</category>`;
