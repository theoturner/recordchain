package eu.mhutti1.healthchain.server.proof;

import com.sun.net.httpserver.HttpExchange;
import eu.mhutti1.healthchain.server.RequestUtils;
import eu.mhutti1.healthchain.server.events.NonEventConsumer;
import eu.mhutti1.healthchain.storage.EventNode;
import eu.mhutti1.healthchain.storage.EventStorage;
import org.hyperledger.indy.sdk.wallet.Wallet;
import org.json.JSONObject;

import java.io.*;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Created by jedraz on 01/11/2018.
 */
public abstract class ProofRequestHandler extends NonEventConsumer {
  @Override
  public void handle(HttpExchange httpExchange) throws IOException {

    httpExchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

    String query = httpExchange.getRequestURI().getQuery();
    String data = new BufferedReader(new InputStreamReader(httpExchange.getRequestBody())).lines().collect(Collectors.joining("\n"));
    Map<String, String> params = RequestUtils.queryToMap(query);

    String patientDid = params.get("patient_did");

    Wallet proverWallet = null;
    String proverDid = null;

    int responseCode = RequestUtils.statusOK();
    String response = "OK";


    EventStorage.store(patientDid, new EventNode("", null, new JSONObject(data), getApproveEndpoint(), getDismissEndpoint()));


    httpExchange.sendResponseHeaders(responseCode, response.length());
    OutputStream os = httpExchange.getResponseBody();
    os.write(response.getBytes());
    os.close();

    return;
  }

  protected abstract String getDismissEndpoint();

  protected abstract String getApproveEndpoint();

}