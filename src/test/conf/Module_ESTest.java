/*
 * This file was automatically generated by EvoSuite
 * Sat Dec 02 21:34:19 GMT 2017
 */

package conf;

import org.junit.Test;
import static org.junit.Assert.*;
import conf.Module;
import org.evosuite.runtime.EvoRunner;
import org.evosuite.runtime.EvoRunnerParameters;
import org.junit.runner.RunWith;

@RunWith(EvoRunner.class) @EvoRunnerParameters(mockJVMNonDeterminism = true, useVFS = true, useVNET = true, resetStaticState = true, separateClassLoader = true) 
public class Module_ESTest extends Module_ESTest_scaffolding {

  @Test(timeout = 4000)
  public void test0()  throws Throwable  {
      Module module0 = new Module();
      module0.configure();
  }
}
