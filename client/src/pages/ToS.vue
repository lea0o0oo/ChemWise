<script setup>
import config from "../../projectConfig";
</script>
<template>
  <div
    class="min-h-[calc(100vh-70px)] w-full prose lg:prose-xl dark:prose-invert p-10"
  >
    <h1>Termini di Servizio per {{ config.name }}</h1>

    <p>
      Creando un account su {{ config.name }} ("Servizio"), accetti questi
      termini di servizio ("Termini"). Se non sei d'accordo con questi Termini,
      non utilizzare il Servizio.
    </p>

    <h2>1. Creazione e Terminazione dell'Account</h2>
    <p>
      Dovresti avere almeno 13 anni per creare un account. Gli account trovati a
      violare le linee guida della comunità o che mentono sulla età potrebbero
      essere terminati senza preavviso.
    </p>

    <h2>2. Utilizzo del Servizio</h2>
    <p>
      Il Servizio è fornito per la condivisione delle attività degli scout. Si
      incoraggiano gli utenti a caricare contenuti positivi che promuovono un
      ambiente supportivo. Il bullismo, l'arrecamento o il caricamento di
      contenuti inappropriati comporteranno la immediata terminazione
      dell'account.
    </p>

    <h2>3. Proprietà dei Contenuti</h2>
    <p>
      Gli utenti mantengono la proprietà dei loro contenuti caricati. Tuttavia,
      caricando, gli utenti concedono a {{ config.name }} il permesso di
      visualizzare e distribuire i contenuti come parte del Servizio.
    </p>

    <h2>4. Condotta Proibita</h2>
    <p>
      Gli utenti sono proibiti dall'impegnarsi nella bullismo, nell'arrecamento
      o in qualsiasi altro tipo di comportamento abusivo. La violazione di
      questa politica porterà alla terminazione dell'account.
    </p>

    <h2>5. Modifica dei Termini</h2>
    <p>
      {{ config.name }} si riserva il diritto di modificare questi Termini in
      qualsiasi momento. L'utilizzo continuo del Servizio dopo le modifiche
      costituisce l'accettazione di tali modifiche.
    </p>

    <h2>6. Risoluzione delle Contestazioni</h2>
    <p>
      Qualsiasi disputa derivante da questi Termini sarà risolta attraverso la
      mediazione prima di ricorrere all'azione legale.
    </p>

    <h2>7. Legge Applicabile</h2>
    <p>Questi Termini saranno regolati dalla legge dell' Italia</p>

    <h2>8. Informazioni di Contatto</h2>
    <p>
      Per eventuali richieste / modifiche relative a questi Termini, contattaci
      alla pagina github del progetto.
    </p>

    <h2>9. Disposizioni Finali</h2>
    <p>
      La mancata osservanza di questi Termini può portare alla sospensione o
      alla terminazione del tuo accesso al Servizio.
    </p>
  </div>
</template>
