<?php
/* Copyright 2021 European Commission
    
Licensed under the EUPL, Version 1.2 only (the "Licence");
You may not use this work except in compliance with the Licence.

You may obtain a copy of the Licence at:
	https://joinup.ec.europa.eu/software/page/eupl5

Unless required by applicable law or agreed to in writing, software 
distributed under the Licence is distributed on an "AS IS" basis, 
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either 
express or implied.

See the Licence for the specific language governing permissions 
and limitations under the Licence. */
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Commitment rejected by Host</title>
</head>

<body>
<p>Sorry!</p>
<p>Your commitment "<?php echo $commitment->proposal_title ?>" cannot be published and requires further updates on your part.</p>
<p>Please be advised that we follow strict rules for the eligibility of commitments. More information on this topic can be requested from the Host Team.</p>
<?php
if(count($commitment->history) > 0) {

    $comment = $commitment->history[0]->comment;

    if($comment) {

        ?>
        <p>Your Host <?php echo $commitment->proposal_host->user_firstname.' '.$commitment->proposal_host->user_name ?> commented:</p>
        <p><?php echo $comment ?></p>
        <?php
    }
}
?>
<p></p>
<p>To access your commitment page:</p>
<a href="<?php echo site_url('commitments/view/'.$commitment->proposal_id) ?>"><?php echo site_url('commitments/view/'.$commitment->proposal_id) ?></a>
<p>Let us know how we can help!</p>
<p>The Conference Organizing Team</p>
</body>
</html>
