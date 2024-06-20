<?php
error_reporting(~0);
//ini_set('display_errors', 1);
//header("Access-Control-Allow-Origin: *");                                                                            
header('Content-Type: application/json');
error_reporting(E_ERROR | E_PARSE);
//$time_start = microtime(true);

function url_get_contents($url, $useragent='cURL', $headers=false, $follow_redirects=true, $debug=false) {

    // initialise the CURL library
    $ch = curl_init();

    // specify the URL to be retrieved
    curl_setopt($ch, CURLOPT_URL,$url);

    // we want to get the contents of the URL and store it in a variable
    curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);

    // specify the useragent: this is a required courtesy to site owners
    curl_setopt($ch, CURLOPT_USERAGENT, $useragent);

    // ignore SSL errors
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

    // return headers as requested
    if ($headers==true){
        curl_setopt($ch, CURLOPT_HEADER,1);
    }

    // only return headers
    if ($headers=='headers only') {
        curl_setopt($ch, CURLOPT_NOBODY ,1);
    }

    // follow redirects - note this is disabled by default in most PHP installs from 4.4.4 up
    if ($follow_redirects==true) {
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); 
    }

    // if debugging, return an array with CURL's debug info and the URL contents
    if ($debug==true) {
        $result['contents']=curl_exec($ch);
        $result['info']=curl_getinfo($ch);
    }

    // otherwise just return the contents as a variable
    else $result=curl_exec($ch);

    // free resources
    curl_close($ch);

    // send back the data
    return $result;
}

function getElementsByClass(&$parentNode, $tagName, $className) {
    $nodes=array();

    $childNodeList = $parentNode->getElementsByTagName($tagName);
    for ($i = 0; $i < $childNodeList->length; $i++) {
        $temp = $childNodeList->item($i);
        if (stripos($temp->getAttribute('class'), $className) !== false) {
            $nodes[]=$temp;
        }
    }

    return $nodes;
}

$countries = ['FAC', 'CDR', 'CIT', 'DFB', 'FRC', 'POPO', 'NLP', 'TRP', 'RUP', 'CCB', 'NOPO', 'GRP', 'OFB', 'UKRP', 'SCC', 'TSP', 'DKP', 'SFA', 'POPU', 'SERP', 'SEC', 'ROMP', 'KRC', 'BULP', 'UNGP', 'ISPO', 'CPO1', 'SKC', 'KAZP', 'BIHP', 'ASPK', 'WRPO', 'SLP', 'ALBP', 'MALC', 'FIS', 'ARPO', 'LTVP', 'KOP1', 'ISP', 'MWP1', 'NIRC', 'LUXP', 'IRPO', 'MNEC', 'ESTP', 'ANDP', 'WALE', 'FAPO', 'GIRC', 'SMP1', 'LIEP'];

$completeList = [];

foreach($countries as $country) {
    $aDataTableHeaderHTML = [];
    $htmlContent = url_get_contents('https://www.transfermarkt.pl/copa-del-rey/spieltag/pokalwettbewerb/' . $country . '/saison_id/2023');
		
		try {
		    $DOM = new DOMDocument();
		    $DOM->loadHTML($htmlContent);
            $tableScores = getElementsByClass($DOM, 'td', 'spieltagsansicht-ergebnis');
		    $table = getElementsByClass($DOM, 'td', 'hide-for-small spieltagsansicht-vereinsname');
		} catch(Exception $e) {
		    throw new Exception($country . ' + ' . $e->getMessage());
		}

	$totalPoints = [];
    $aDataTableHeaderHTMLScores = [];
    $teamCounter = -3;
    $teamWin = 0;
    
    foreach($tableScores as $NodeHeaderScores) 
	{
	    $HeaderToScores = $NodeHeaderScores->getElementsByTagName('a');
        $HeaderToScoresSpan = $NodeHeaderScores->getElementsByTagName('span');
	    if(trim($HeaderToScoresSpan[0]->textContent) == '') {
	        $stringScores = trim($HeaderToScoresSpan[1]->textContent);
            $teamCounter = $teamCounter + 2;
	    } else {
	        $stringScores = trim($HeaderToScoresSpan[0]->textContent);
            $teamCounter = $teamCounter + 2;
	    }

        $stringScores = str_replace(' p. d.', '', $stringScores);
        $stringScores = str_replace(' po r.k.', '', $stringScores);

        $scoresArray = explode(':', $stringScores);
        if($scoresArray[0] == '-') {

        } elseif($scoresArray[0] > $scoresArray[1]) {
            $teamWin = 1;
        } else {
            $teamWin = 2;
        }

        if($teamWin > 0) {
            $aDataTableHeaderHTMLScores[] = $teamCounter + $teamWin;
        } else {
            $aDataTableHeaderHTMLScores[] = $teamCounter + 1;
            $aDataTableHeaderHTMLScores[] = $teamCounter + 2;
        }
	}

    echo json_encode($aDataTableHeaderHTMLScores);

	foreach($table as $NodeHeader) 
	{
	    $HeaderTo = $NodeHeader->getElementsByTagName('a');
	    if(trim($HeaderTo[0]->textContent) == '') {
	        $string = trim($HeaderTo[1]->textContent);
	    } else {
	        $string = trim($HeaderTo[0]->textContent);
	    }
	    $aDataTableHeaderHTML[] = $string;
	}

    $teamRemains = [];

    foreach ($aDataTableHeaderHTMLScores as $value) {
        $teamRemains[] = $aDataTableHeaderHTML[$value];
    }

	$teamCounters = 1;
	
	$completeList[] = ['league_code' => $country, 'remain_teams' => $teamRemains];
}

echo json_encode($completeList, JSON_PRETTY_PRINT);
?>
<?php
//throw new \Exception('wyjatek');
//$myfile = fopen("domains/robertkonopka.shop/public_html/cups.json", "w") or die("Unable to open file!");
//fwrite($myfile, $txt);
//fclose($myfile);
?>